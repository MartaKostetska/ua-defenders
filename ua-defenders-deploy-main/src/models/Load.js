const mongoose = require('mongoose');
const Joi = require('joi');
const { number, required, any, allow } = require('joi');

const loadJoiSchema = Joi.object({
	name: Joi.string()
		.alphanum()
		.min(2)
		.max(60)
		.required(),

	payload: Joi.number().min(1).required(),

	pickup_address: Joi.string().min(10).required(),

	delivery_address: Joi.string().min(10).required(),

	dimensions: Joi.object({
		width: Joi.number().greater(0).required(),
		length: Joi.number().greater(0).required(),
		height: Joi.number().greater(0).required(),

	})
});

const Load = mongoose.model('Load', {
	created_by: {
		type: String,
		required: true,
	},
	assigned_to: {
		type: String,
		required: false,
	},
	status: {
		type: String,
		required: true,
	},
	state: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	payload: {
		type: Number,
		required: true,
	},
	pickup_address: {
		type: String,
		required: true,
	},
	delivery_address: {
		type: String,
		required: true,
	},
	dimensions: {
		width: {
			type: Number,
			required: true
		},
		length: {
			type: Number,
			required: true
		},
		height: {
			type: Number,
			required: true
		},
	},
	logs: {
		message: String,
		time: String,
	},
	created_date: {
		type: String,
		required: true
	}
});

module.exports = {
	Load,
	loadJoiSchema,
};
