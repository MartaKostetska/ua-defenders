const mongoose = require('mongoose');
const Joi = require('joi');

const helpRequestJoiSchema = Joi.object({
	title: Joi.string()
		.alphanum()
		.min(2)
		.max(60),
});

const HelpRequest = mongoose.model('HelpRequest', {
	created_by: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	contact: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	created_date: {
		type: String,
		required: true
	}
});

module.exports = {
	HelpRequest,
	helpRequestJoiSchema,
};
