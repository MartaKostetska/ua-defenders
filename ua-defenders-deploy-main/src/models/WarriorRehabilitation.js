const mongoose = require('mongoose');
const Joi = require('joi');

const warriorRehabilitationJoiSchema = Joi.object({
	title: Joi.string()
		.alphanum()
		.min(2)
		.max(60),
});

const WarriorRehabilitation = mongoose.model('WarriorRehabilitation', {
	created_by: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	militaryPoint: {
		type: String,
		required: true,
	},
	history: {
		type: String,
		required: true,
	},
	medicine: {
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
	contact: {
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
	WarriorRehabilitation,
	warriorRehabilitationJoiSchema,
};
