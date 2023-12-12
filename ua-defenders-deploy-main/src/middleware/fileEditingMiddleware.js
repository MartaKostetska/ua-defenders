const {getCharityProjectByIdDB} = require("../services/charityProjectService");

const { User } = require('../models/Users');

const fileEditingMiddleware = async (req, res, next) => {
	const userId = req.user._id;
	const desiredDelete = req.params.id;

	const desiredDeleteProject = await getCharityProjectByIdDB(desiredDelete);
	const currentUser = await User.findById(userId);

	const { type } = currentUser;
	type === 'admin' || desiredDeleteProject.created_by === userId ? next() : res.status(403).json({ message: `Forbidden. You are not able to data manipulation!` });
}

module.exports = {
	fileEditingMiddleware,
};

