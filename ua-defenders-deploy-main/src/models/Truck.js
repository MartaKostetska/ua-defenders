const mongoose = require('mongoose');
const Joi = require('joi');

const truckJoiSchema = Joi.object({
	type: Joi.any().allow('SPRINTER', 'SMALL STRAIGHT', 'LARGE STRAIGHT').required(),
});

const Truck = mongoose.model('Truck', {
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
	Truck,
	truckJoiSchema,
};
