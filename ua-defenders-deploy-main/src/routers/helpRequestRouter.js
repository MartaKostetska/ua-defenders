const express = require('express');
const router = express.Router();
const { adminCheckMiddleware } = require('../middleware/adminCheckMiddleware');
const { fileEditingMiddleware } = require('../middleware/fileEditingMiddleware');
const { getRequestsByUserId, getOffersRequest, getRequestRequest, getPendingRequests, getRequestDetails, addRequest, deleteRequest, updateRequest, acceptRequest, rejectRequest } = require('../controllers/helpRequestController');
const {getProjectsByUserId} = require("../controllers/charityProjectController");
const {deleteWarriorByIdWithFiles} = require("../controllers/warriorRehabilitationController");

router.put('/:id', updateRequest);
router.get('/offers', getOffersRequest);
router.delete('/deleteById/:id', deleteRequest);
router.get('/getAllByUserId', getRequestsByUserId)
router.get('/request', getRequestRequest);
router.get('/pending', adminCheckMiddleware, getPendingRequests);
router.get('/:id', getRequestDetails);
router.post('/', addRequest);
router.delete('/:id', deleteRequest);
router.put('/accept/:id', adminCheckMiddleware, acceptRequest);
router.put('/reject/:id', adminCheckMiddleware, rejectRequest);


module.exports = {
	helpRequestRouter: router,
};
