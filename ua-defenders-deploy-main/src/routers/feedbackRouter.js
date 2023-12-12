const express = require('express');
const router = express.Router();
const { adminCheckMiddleware } = require('../middleware/adminCheckMiddleware');
const { getFeedbacks, addFeedback, deleteFeedback } = require('../controllers/feedbackController');

router.get('/pending', adminCheckMiddleware, getFeedbacks);
router.post('/', addFeedback);
router.delete('/:id', adminCheckMiddleware, deleteFeedback);


module.exports = {
	feedbackRouter: router,
};
