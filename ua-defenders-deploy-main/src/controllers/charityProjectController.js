// const { charityProjectJoiSchema } = require('../models/CharityProject.js');
const {
    deleteById,
    updateProjectById,
    setNullFile,
    getCharityProjectsByUserId,
    saveCharityProjectDB,
    getPendingCharityProjectsDB,
    getCharityProjectsDB,
    getCharityProjectByIdDB,
    deleteCharityProjectsDB,
    acceptProjectDB,
    rejectProjectDB
} = require('../services/charityProjectService');
const path = require("path");
const fs = require("fs");
const {not} = require("joi");

async function deleteFileByName(req, res, next) {
    const fileName = req.params.filename
    const uploadPath = path.join(__dirname, '../../uploads/');
    const unlink = await setNullFile(fileName);
    const result = fs.unlink(uploadPath + fileName, (err) => console.log(err));
    return res.status(200).json(result);
}

const addProject = async (req, res, next) => {
    const created_by = req.user._id;

    const {
        title,
        description,
        details,
        category,
        contact,
        sum,
        location,
    } = req.body;
    const {documents, photos} = req.files;

    const document = documents ? documents.map(doc => doc.filename) : [];

    const img = photos ? photos[0].filename : null;

    const requiredFields = ['title', 'description', 'details', 'category', 'contact', 'location', 'sum'];
    const areFieldsMissing = !requiredFields.every(field => req.body[field]);
    if (areFieldsMissing) {
        return res.status(400).json({message: 'Missing required fields'});
    }

    const asyncSave = await saveCharityProjectDB({
        created_by,
        title,
        description,
        details,
        category,
        location,
        contact,
        sum,
        img,
        document
    });
    if (!asyncSave) {
        return res.status(500).json({message: 'Charity Project creation failed'});
    }
    return res.status(200).json({message: `Charity Project created successfully`});
}

async function deleteProjectByIdWithFiles(req, res, next) {
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

    const updateProject = async (req, res, next) => {
        try {
            const id = req.params.id;
            const uploadPath = path.join(__dirname, '../../uploads/');
            const {title, description, sum, details, prevImg, prevDocuments} = req.body;
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
                title: title,
                description: description,
                sum: sum,
                details: details,
                document: newDocuments,
                img: img
            }
            const updatedProject = await updateProjectById(id, updateBody);
            return res.status(200).json({message: "updated"});
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    }

    const getProjectsByUserId = async (req, res) => {
        try {
            const userId = req.user._id;
            const receivedCharityProjects = await getCharityProjectsByUserId(userId);
            return res.status(200).json({receivedCharityProjects});
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    };


    const getProjects = async (req, res, next) => {
        try {
            const query = req.query;
            const receivedCharityProjects = await getCharityProjectsDB(query);
            return res.status(200).json({receivedCharityProjects});
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    };


    const getProjectDetails = async (req, res, next) => {
        const id = req.params.id;
        try {
            const recievedCharityProjectDetails = await getCharityProjectByIdDB(id);
            return res.status(200).json(recievedCharityProjectDetails);
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    }

    const getPendingProjects = async (req, res, next) => {
        try {
            const pendingProjects = await getPendingCharityProjectsDB();
            return res.status(200).json({pendingProjects});
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    };

    const deleteProject = async (req, res, next) => {
        try {
            const requestBy = req.user._id;
            const desiredDelete = req.params.id;

            const desiredDeleteProject = await getCharityProjectByIdDB(desiredDelete);
            if (desiredDeleteProject.created_by === requestBy || req.user.role === 'admin') {
                const projectDeleted = await deleteCharityProjectsDB(desiredDelete);
                !projectDeleted ? res.status(500).json({message: err.message}) : res.status(200).json({message: "Charity Project deleted successfully"});
            } else {
                return res.status(403).json({message: "Forbidden"});
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: "Internal server error"});
        }
    }

    const acceptProject = async (req, res, next) => {
        const projectId = req.params.id;
        try {
            await acceptProjectDB(projectId);
            return res.status(200).json({message: "Charity Project accepted successfully"});
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    }
    const rejectProject = async (req, res, next) => {
        const projectId = req.params.id;
        try {
            await rejectProjectDB(projectId);
            return res.status(200).json({message: "Charity Project rejected successfully"});
        } catch (error) {
            next(error);
        }
    }

    module.exports = {
        addProject,
        getProjects,
        getProjectDetails,
        getPendingProjects,
        updateProject,
        deleteProject,
        acceptProject,
        rejectProject,
        getProjectsByUserId,
        deleteFileByName,
        deleteProjectByIdWithFiles
    }