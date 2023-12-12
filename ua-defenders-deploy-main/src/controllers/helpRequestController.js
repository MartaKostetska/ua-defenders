// const { charityProjectJoiSchema } = require('../models/CharityProject.js');
const {
    getRequestsUserId,
    getHelpRequestsDB,
    getPendingHelpRequstDB,
    getHelpRequestByIdDB,
    saveHelpRequestDB,
    deleteHelpRequestsDB,
    acceptRequestDB,
    rejectRequestDB,
    updateRequestById
} = require('../services/helpRequestService');
const {getCharityProjectsByUserId} = require("../services/charityProjectService");

const updateRequest = async (req, res, next) => {
    try {
        const id = req.params.id
        const {title, description, location, contact} = req.body
        const updatedRequest = await updateRequestById(id, title, description, location, contact);
        return res.status(200).json(updatedRequest)
    } catch (err) {
        return res.status(500).json({message: err.message});
    }

}
const getOffersRequest = async (req, res, next) => {
    try {
        const query = req.query;
        const receivedHelpRequests = await getHelpRequestsDB(query, 'offer');
        return res.status(200).json({receivedHelpRequests});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};


const getRequestsByUserId = async (req, res) => {
    try {
        const userId = req.user._id;
        const receivedRequestProjects = await getRequestsUserId(userId);
        return res.status(200).json({receivedRequestProjects});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};


const getRequestRequest = async (req, res, next) => {
    try {
        const query = req.query;
        const receivedHelpRequests = await getHelpRequestsDB(query, 'request');
        return res.status(200).json({receivedHelpRequests});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

const getPendingRequests = async (req, res, next) => {
    try {
        const pendingRequests = await getPendingHelpRequstDB();
        return res.status(200).json({pendingRequests});
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};

const getRequestDetails = async (req, res, next) => {
    const id = req.params.id;
    try {
        const recievedHelpRequestDetails = await getHelpRequestByIdDB(id);
        return res.status(200).json(recievedHelpRequestDetails);
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}


const addRequest = async (req, res, next) => {
    const {
        location,
        title,
        description,
        category,
        contact,
        type,
    } = req.body;
    const created_by = req.user._id;

    const requiredFields = ['location', 'title', 'description', 'category', 'contact', 'type'];
    const areFieldsMissing = !requiredFields.every(field => req.body[field]);
    if (areFieldsMissing) {
        return res.status(400).json({message: 'Missing required fields'});
    }

    const asyncSave = await saveHelpRequestDB({
        created_by,
        location,
        title,
        description,
        category,
        type,
        contact,
    });
    if (!asyncSave) {
        return res.status(500).json({message: 'Help Request creation failed'});
    }
    return res.status(200).json({message: `Help Request created successfully`});
}

const deleteRequest = async (req, res, next) => {
    try {
        const requestBy = req.user._id;
        const desiredDelete = req.params.id;

        const desiredDeleteRequest = await getHelpRequestByIdDB(desiredDelete);

        if (desiredDeleteRequest.created_by === requestBy || req.user.role === 'admin') {
            const requestDeleted = await deleteHelpRequestsDB(desiredDelete);
            !requestDeleted ? res.status(500).json({message: err.message}) : res.status(200).json({message: "Help Request deleted successfully"});
        } else {
            return res.status(403).json({message: "Forbidden"});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal server error"});
    }
}

const acceptRequest = async (req, res, next) => {
    const requestId = req.params.id;
    try {
        await acceptRequestDB(requestId);
        return res.status(200).json({message: "Help Request accepted successfully"});
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}

const rejectRequest = async (req, res, next) => {
    const requestId = req.params.id;
    try {
        await rejectRequestDB(requestId);
        return res.status(200).json({message: "Help Request rejected successfully"});
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getOffersRequest,
    getRequestRequest,
    getPendingRequests,
    getPendingRequests,
    getRequestDetails,
    addRequest,
    deleteRequest,
    updateRequest,
    acceptRequest,
    rejectRequest,
    getRequestsByUserId
}