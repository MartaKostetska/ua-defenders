const express = require('express');

const router = express.Router();
const { getUser, deleteUser, changeUser, changeUserData } = require('../controllers/userController');

router.get('/', getUser);
router.delete('/', deleteUser);
router.patch('/password', changeUser);
router.put('/update', changeUserData)

module.exports = {
	usersRouter: router,
};
