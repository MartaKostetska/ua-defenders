const mongoose = require('mongoose');
const Joi = require('joi');

const charityProjectJoiSchema = Joi.object({
	title: Joi.string()
		.alphanum()
		.min(2)
		.max(60),
});

const CharityProject = mongoose.model('CharityProject', {
	created_by: {
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
	sum: {
		type: String,
		required: true,
	},
	details: {
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
	location: {
		type: String,
		required: true,
	},
	img: {
		type: String,
		required: false
	},
	document: {
		type: Array,
		required: false
	},
	status: {
		type: String,
		required: true,
	},
	created_date: {
		type: String,
		required: true
	}
});

module.exports = {
	CharityProject,
	charityProjectJoiSchema,
};
