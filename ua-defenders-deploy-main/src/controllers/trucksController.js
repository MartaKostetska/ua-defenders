const { truckJoiSchema } = require('../models/Truck.js');
const { saveTruck, getTrucksDb, getTruckById, changeTruckById, deleteTruckById, assignTruckById } = require('../services/trucksService');

const getTrucks = async (req, res, next) => {
	const created_by = req.user._id;
	const allDriversTrucks = await getTrucksDb(created_by);
	return res.status(200).json({ trucks: allDriversTrucks });
}
const addTruck = async (req, res, next) => {
	const created_by = req.user._id;
	const { type } = req.body;
	await truckJoiSchema.validateAsync({
		type
	});

	await saveTruck({
		created_by,
		type
	});
	return res.status(200).json({ message: `Truck created successfully` });
}
const getTruck = async (req, res, next) => {
	const created_by = req.user._id;
	const serached_truck_id = req.params.id;
	const searchedDriversTruck = await getTruckById(created_by, serached_truck_id);
	return res.status(200).json({ truck: searchedDriversTruck[0] });
}
const changeTruck = async (req, res, next) => {
	const created_by = req.user._id;
	const { type } = req.body;
	const serached_truck_id = req.params.id;
	await changeTruckById(created_by, serached_truck_id, type);
	return res.status(200).json({ message: "Truck details changed successfully" });
}

const deleteTruck = async (req, res, next) => {
	const created_by = req.user._id;
	const serached_truck_id = req.params.id;
	await deleteTruckById(created_by, serached_truck_id);
	return res.status(200).json({ message: "Truck deleted successfully" });
}

const assignTruck = async (req, res, next) => {
	const created_by = req.user._id;
	const serached_truck_id = req.params.id;
	await assignTruckById(created_by, serached_truck_id);
	return res.status(200).json({ message: "Truck assigned successfully" });
}

module.exports = {
	addTruck,
	getTrucks,
	getTruck,
	changeTruck,
	deleteTruck,
	assignTruck
}