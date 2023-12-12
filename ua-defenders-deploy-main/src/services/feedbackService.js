const { Feedback } = require('../models/Feedback');


const saveFeedbacksDB = async ({
	created_by, message, contact,
}) => {
	const feedback = new Feedback({
		created_by, message, contact,
		created_date: new Date().toISOString(),
	});
	const asyncSave = await feedback.save();
	return asyncSave;
};

const getWarriorRehabilitationByIdDB = async (warriorRehabilitationId) => {
	try {
		const warrior = await WarriorRehabilitation.findById(warriorRehabilitationId);
		if (!warrior) {
			throw new Error(`Warrior with ID ${warriorRehabilitationId} not found`);
		}
		return warrior;
	} catch (error) {
		throw new Error(`Error getting Warrior: ${error.message}`);
	}
};

const getFeedbacksDB = async () => {
	try {


		const feedbacks = await Feedback.find({});

		if (!feedbacks) {
			throw new Error('No feedbacks found');
		}

		return feedbacks;

	} catch (error) {
		throw new Error('Error retrieving feedbacks');
	}
};


const deleteFeedbacksDB = async (feedbackId) => await Feedback.findByIdAndDelete({ _id: feedbackId });


module.exports = {
	getFeedbacksDB,
	saveFeedbacksDB,
	deleteFeedbacksDB
};
