// const { charityProjectJoiSchema } = require('../models/CharityProject.js');
const { deleteById, updateWarriorById, saveWarriorRehabilitationDB, getWarriorRehabilitationsUserId, getWarriorRehabilitationByIdDB, getPendingWarriorRehabilitationsDB, getWarriorRehabilitationsDB, deleteWarriorRehabilitationsDB, acceptWarriorDB, rejectWarriorDB } = require('../services/warriorRehabilitationService');
const path = require("path");
const fs = require("fs");



const deleteFileByName = ( req, res, next) => {
	const fileName = req.params.filename
	const uploadPath = path.join(__dirname, '../../uploads/');
	fs.unlink(uploadPath + fileName)
	return res.status(200);
}
async function deleteWarriorByIdWithFiles(req, res, next) {
	try {
		const {prevImg, prevDocument} = req.body;
		const id = req.params.id;
		const uploadPath = path.join(__dirname, '../../uploads/');
		if (prevImg != null) {
			fs.unlink(uploadPath + prevImg, (err) => console.log(err));
		}
		if (prevDocument != null) {
			for (const docs of prevDocument)
				fs.unlink(uploadPath + docs, (err) => console.log(err));
		}
		const receivedCharityProjects = await deleteById(id);
		return res.status(200).json({receivedCharityProjects});
	}
	catch (error)
	{
		return res.status(500).json({message: error.message});
	}

}
function compareDocs(prevDocs, newDocs) {
	const uploadPath = path.join(__dirname, '../../uploads/');

	// Переконайтеся, що prevDocs - це масив
	const prevDocsArray = Array.isArray(prevDocs) ? prevDocs : [];

	const commonElements = prevDocsArray.filter(element => newDocs.includes(element));
	const missingElements = prevDocsArray.filter(element => !newDocs.includes(element));

	// Видалення відсутніх елементів
	missingElements.map((oldDocument) => {
		const filePath = path.join(uploadPath, oldDocument);
		fs.unlink(filePath, (err) => {
			if (err) {
				console.log(err);
			}
		});
	});

	return newDocs;
}

const updateWarriorWithFiles = async (req, res, next) => {
	try {
		const id = req.params.id;
		const uploadPath = path.join(__dirname, '../../uploads/');
		const {name, medicine, history, militaryPoint, sum, location, details, prevImg, prevDocuments} = req.body;
		let {documents, photos} = req.files;
		const prevDoc = req.body.documents
		let docsnames = [];
		if (Array.isArray(prevDoc)) docsnames = [...prevDoc];
		if (typeof prevDoc === 'string' && prevDoc.trim() !== '' && !Array.isArray(prevDoc)) {
			// Split the existing filenames and add them to docsnames
			docsnames.push(...prevDoc.split(','));
		}

		if (documents == undefined) {

		} else {
			for (const doc of documents) {
				docsnames.push(doc.filename)
			}
		}

		const img = photos ? photos[0].filename : prevImg;
		if (prevImg != img) {
			fs.unlink(uploadPath + prevImg, (err) => console.log(err));
		}

		const newDocuments = compareDocs(prevDocuments, docsnames);
		const updateBody = {
			name: name,
			medicine: medicine,
			history: history,
			militaryPoint: militaryPoint,
			sum: sum,
			location: location,
			details: details,
			document: newDocuments,
			img: img
		}
		const updatedProject = await updateWarriorById(id, updateBody);
		return res.status(200).json({message: "updated"});
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
}

const addWarrior = async (req, res, next) => {
	const {
		name,
		location,
		militaryPoint,
		history,
		medicine,
		sum,
		details,
		contact,
	} = req.body;
	const created_by = req.user._id;
	const { documents, photos } = req.files;

	const document = documents ? documents.map(doc => doc.filename) : [];
	const img =  photos ? photos[0].filename : null;

	const requiredFields = [ 'name', 'location', 'militaryPoint', 'history', 'medicine', 'sum', 'details', 'contact'];
	const areFieldsMissing = !requiredFields.every(field => req.body[field]);
	if (areFieldsMissing) {
		return res.status(400).json({ message: 'Missing required fields' });
	}

	const asyncSave = await saveWarriorRehabilitationDB({
		created_by,
		name,
		location,
		militaryPoint,
		history,
		medicine,
		sum,
		details,
		contact,
		img,
		document
	});
	if (!asyncSave) {
		return res.status(500).json({ message: 'Warrior Rehabilitatio creation failed' });
	}
	return res.status(200).json({ message: `Warrior Rehabilitation created successfully` });
}
const getWarriorRehabilitationsByUserId = async (req, res) => {
	try {
		const userId = req.user._id;
		const receivedWarriorProjects = await getWarriorRehabilitationsUserId(userId);
		return res.status(200).json({ receivedWarriorProjects });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};


const getWarriors = async (req, res, next) => {
	try {
		const query = req.query;
		const receivedwarriorRehabilitation = await getWarriorRehabilitationsDB(query);
		return res.status(200).json({ receivedwarriorRehabilitation });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};


const getWarriorDetails = async (req, res, next) => {
	const id = req.params.id;
	try {
		const recievedWarriorRehabilitationDetails = await getWarriorRehabilitationByIdDB(id);
		return res.status(200).json(recievedWarriorRehabilitationDetails);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
}


const getPendingWarriors = async (req, res, next) => {
	try {
		const pendingWarriors = await getPendingWarriorRehabilitationsDB();
		return res.status(200).json({ pendingWarriors });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

const updateWarrior = async (req, res, next) => {
	return;
}

const deleteWarrior = async (req, res, next) => {
	try {
		const requestBy = req.user._id;
		const desiredDelete = req.params.id;

		const desiredDeleteWarrior = await getWarriorRehabilitationByIdDB(desiredDelete);

		if (desiredDeleteWarrior.created_by === requestBy || req.user.role === 'admin') {
			const warriorDeleted = await deleteWarriorRehabilitationsDB(desiredDelete);
			!warriorDeleted ? res.status(500).json({ message: err.message }) : res.status(200).json({ message: "Warrior Rehabilitation deleted successfully" });
		} else {
			return res.status(403).json({ message: "Forbidden" });
		}
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal server error" });
	}
}

const acceptWarrior = async (req, res, next) => {
	const warrioirId = req.params.id;
	try {
		await acceptWarriorDB(warrioirId);
		return res.status(200).json({ message: "Warrior Rehabilitation accepted successfully" });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
}

const rejectWarrior = async (req, res, next) => {
	const warrioirId = req.params.id;
	try {
		await rejectWarriorDB(warrioirId);
		return res.status(200).json({ message: "Warrior Rehabilitation rejected successfully" });
	} catch (error) {
		next(error);
	}
}

module.exports = {
	addWarrior,
	getWarriors,
	getWarriorDetails,
	getPendingWarriors,
	updateWarrior,
	deleteWarrior,
	acceptWarrior,
	rejectWarrior,
	getWarriorRehabilitationsByUserId,
	deleteFileByName,
	deleteWarriorByIdWithFiles,
	updateWarriorWithFiles
}