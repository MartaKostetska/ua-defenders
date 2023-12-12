// const { charityProjectJoiSchema } = require('../models/CharityProject.js');
const { getFeedbacksDB, saveFeedbacksDB, deleteFeedbacksDB } = require('../services/feedbackService');

//addFeedback, getFeedbacks, deleteFeedback
const addFeedback = async (req, res, next) => {
	const {
		message,
		contact,
	} = req.body;
	const created_by = req.user._id;

	const requiredFields = [ 'message', 'contact'];
	const areFieldsMissing = !requiredFields.every(field => req.body[field]);
	if (areFieldsMissing) {
		return res.status(400).json({ message: 'Missing required fields' });
	}

	const asyncSave = await saveFeedbacksDB({
		created_by,
		message,
		contact,
	});
	if (!asyncSave) {
		return res.status(500).json({ message: 'Feedback creation failed' });
	}
	return res.status(200).json({ message: `Feedback created successfully` });
}


const getFeedbacks = async (req, res, next) => {
	try {
		const query = req.query;
		const receivedFeedback = await getFeedbacksDB(query);
		return res.status(200).json({ receivedFeedback });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};



const deleteFeedback = async (req, res, next) => {
	try {
		const desiredDelete = req.params.id;


		const feedbackDeleted = await deleteFeedbacksDB(desiredDelete);
		!feedbackDeleted ? res.status(500).json({ message: err.message }) : res.status(200).json({ message: "Feedback Rehabilitation deleted successfully" });

	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal server error" });
	}
}



module.exports = {
	addFeedback, getFeedbacks, deleteFeedback
}