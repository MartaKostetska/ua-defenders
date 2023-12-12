const { Truck } = require('../models/Truck');

const getTrucksDb = async (driverId) => await Truck.find({ created_by: driverId });

const saveTruck = async ({
	created_by, type
}) => {
	const truck = new Truck({
		created_by,
		assigned_to: "none",
		type,
		status: "IS",
		created_date: new Date().toISOString(),
	});
	const asyncSave = await truck.save();
	return asyncSave;
};

const getTruckById = async (driverId, truckId) => await Truck.find({ created_by: driverId, _id: truckId });

const changeTruckById = async (driverId, truckId, type) => await Truck.findByIdAndUpdate({ created_by: driverId, _id: truckId }, { $set: { type } });

const deleteTruckById = async (driverId, truckId) => await Truck.findByIdAndDelete({ created_by: driverId, _id: truckId });

const assignTruckById = async (driverId, truckId) => await Truck.findByIdAndUpdate({ _id: truckId }, { $set: { assigned_to: driverId } });

module.exports = {
	saveTruck,
	getTrucksDb,
	getTruckById,
	changeTruckById,
	deleteTruckById,
	assignTruckById
};
