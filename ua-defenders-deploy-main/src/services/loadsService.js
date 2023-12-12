const { Load } = require('../models/Load');

// const getTrucksDb = async (driverId) => await Truck.find({ created_by: driverId });

const saveLoad = async ({
	name, payload, pickup_address, delivery_address, dimensions, created_by,
}) => {
	console.log("dimensions", dimensions);
	const load = new Load({
		created_by,
		assigned_to: null,
		status: "NEW",
		state: "just created",
		name,
		payload,
		pickup_address,
		delivery_address,
		dimensions,
		logs: [
			{
				message: "Load has just created and has not assigned to driver yet",
				time: new Date().toISOString(),
			}
		],
		created_date: new Date().toISOString(),
	});
	console.log(load);
	const asyncSave = await load.save();
	return asyncSave;
};

module.exports = {
	saveLoad,
};
