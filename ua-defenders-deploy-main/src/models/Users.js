const mongoose = require('mongoose');
const Joi = require('joi');

const userJoiSchema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(2)
    .max(60),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),

  phone: Joi.string()
      .pattern(new RegExp('^\\+?3?8?(0\\d{9})$'))
      .required(),

  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),



});

const User = mongoose.model('User', {
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  social: {
    type: String,
    required: false,
  },
  password: {
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
  User,
  userJoiSchema,
};
