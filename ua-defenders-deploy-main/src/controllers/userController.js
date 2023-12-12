const bcrypt = require('bcryptjs');
const { User } = require('../models/Users.js');


const getUser = async (req, res, next) => {

	if (req.user) {
		const userId = req.user._id;
		const { _id, type, name, email, phone, social, created_date } = await User.findById(userId);
		res.json({ user: { _id, type, email, name, phone, social, created_date } });
	} else {
		res.status(400);
	}
};

const deleteUser = async (req, res, next) => {
	const userId  = req.user._id;
	console.log(userId)
	try {

		await User.deleteOne({_id: userId});

		res.json({
			message: "Success",
		});

	} catch (error) {
		res.status(400)
	}

}
const changeUserData = async (req, res, next) => {
	const userId = req.user._id;
	const user = await User.findById(userId);

	const { name, email, phone, social } = req.body;

	if (name && email && phone) {
		user.name = name
		user.email = email
		user.phone = phone
		user.social = social || ""
		await user.save();
		res.json({
			message: "Success",
		})
	} else res.status(400).json({ "message": "Bad Request" });

}

const changeUser = async (req, res, next) => {
	const userId = req.user._id;
	const user = await User.findById(userId);

	const { oldPassword, newPassword } = req.body;

	const checkPassword = await bcrypt.compare(String(oldPassword), String(user.password));

	if (checkPassword && newPassword) {
		const passwordForDb = await bcrypt.hash(newPassword, 10);
		user.password = passwordForDb;
		await user.save();
		res.json({
			message: "Success",
		})
	} else res.status(400).json({ "message": "Bad Request" });

}

module.exports = {
	getUser,
	deleteUser,
	changeUser,
	changeUserData
};
