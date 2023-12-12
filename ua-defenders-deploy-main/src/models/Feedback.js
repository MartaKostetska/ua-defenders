const mongoose = require('mongoose');
const Joi = require('joi');

const feedbackJoiSchema = Joi.object({
	title: Joi.string()
		.alphanum()
		.min(2)
		.max(60),
});

const Feedback = mongoose.model('Feedback', {
	created_by: {
		type: String,
		required: true,
	},
	message: {
		type: String,
		required: true
	},
	contact: {
		type: String,
		required: true
	},
	created_date: {
		type: String,
		required: true
	}
});

module.exports = {
	Feedback,
	feedbackJoiSchema,
};
