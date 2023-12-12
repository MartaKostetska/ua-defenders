const { CharityProject } = require('../models/CharityProject');
const path = require("path");
const mongoose = require('mongoose');


const saveCharityProjectDB = async ({
	created_by, title, description, details, category, contact, location, sum, img, document
}) => {
	const project = new CharityProject({
		created_by,
		title,
		sum,
		description,
		details,
		category,
		contact,
		location,
		document,
		img,
		status: 'pending',
		created_date: new Date().toISOString(),
	});
	const asyncSave = await project.save();
	return asyncSave;
};
const deleteById = async  (id) => {
	try {
		await CharityProject.deleteOne({ _id: id });
		console.log('Project deleted successfully!');
	} catch (error) {
		console.error('Error deleting project:', error);
	}
}
const updateProjectById = async (id, updateBody) => {
	try {
		await CharityProject.updateOne(
			{ _id: id },
			{ $set: updateBody}
		);
		console.log('Updated successfully!');
	} catch (error) {
		console.error('Error updating:', error);
	}
}

const setNullFile = async (fileName) => {
	try {
		await CharityProject.updateOne(
			{ document: fileName },
			{ $set: { document: null } }
		);
		console.log('Documents deleted successfully!');
	} catch (error) {
		console.error('Error deleting documents:', error);
	}

}
const getCharityProjectsByUserId = async (userId) => {
	try {
		const projects = await CharityProject.find({created_by: userId});

		if (!projects) {
			throw new Error('No projects found');
		}
		return projects;

	} catch (error) {
		throw new Error('Error retrieving charity projects');
	}
}

const getCharityProjectByIdDB = async (charityProjectId) => {
	try {
		const project = await CharityProject.findById(charityProjectId);
		if (!project) {
			throw new Error(`Charity project with ID ${charityProjectId} not found`);
		}
		return project;
	} catch (error) {
		throw new Error(`Error getting charity project: ${error.message}`);
	}
};
const getPendingCharityProjectsDB = async () => {
	try {
		const pendingProjects = await CharityProject.find({ status: { $in: ['pending', 'rejected'] } });
		return pendingProjects;
	} catch (err) {
		console.error(err);
		throw new Error('Failed to fetch pending projects');
	}
};
const getCharityProjectsDB = async (query) => {
	try {
		const filter = {
			status: 'accepted'
		};

		if (query.location) {
			filter.location = query.location;
		}

		if (query.category) {
			filter.category = query.category;
		}

		const projects = await CharityProject.find(filter);

		if (!projects) {
			throw new Error('No projects found');
		}

		return projects;

	} catch (error) {
		throw new Error('Error retrieving charity projects');
	}
};


const deleteCharityProjectsDB = async (projectId) => await CharityProject.findByIdAndDelete({ _id: projectId });

const acceptProjectDB = async (projectId) => {
	try {
		return await CharityProject.findByIdAndUpdate({ _id: projectId }, { $set: { status: "accepted" } });
	} catch (err) {
		throw new Error("Error accepting charity project");
	}
}

const rejectProjectDB = async (projectId) => {
	try {
		return await CharityProject.findByIdAndUpdate({ _id: projectId }, { $set: { status: "rejected" } });
	} catch (err) {
		throw new Error("Error accepting charity project");
	}
}

// const changeTruckById = async (driverId, truckId, type) => await Truck.findByIdAndUpdate({ created_by: driverId, _id: truckId }, { $set: { type } });



// const assignTruckById = async (driverId, truckId) => await Truck.findByIdAndUpdate({ _id: truckId }, { $set: { assigned_to: driverId } });

module.exports = {
	saveCharityProjectDB,
	getPendingCharityProjectsDB,
	getCharityProjectsDB,
	deleteCharityProjectsDB,
	getCharityProjectByIdDB,
	acceptProjectDB,
	rejectProjectDB,
	getCharityProjectsByUserId,
	setNullFile,
	updateProjectById,
	deleteById

};
