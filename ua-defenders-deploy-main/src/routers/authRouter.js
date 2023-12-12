const express = require('express');

const router = express.Router();
const { registerAuth, loginAuth } = require('../controllers/authController');

const asyncWrapper = (controller) => (req, res, next) => controller(req, res, next).catch(next);

router.post('/register', asyncWrapper(registerAuth));

router.post('/login', loginAuth);

module.exports = {
  authRouter: router,
};
