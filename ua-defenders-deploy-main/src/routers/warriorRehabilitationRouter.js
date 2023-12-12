const express = require('express');
const router = express.Router();
const { adminCheckMiddleware } = require('../middleware/adminCheckMiddleware');
const { fileEditingMiddleware } = require('../middleware/fileEditingMiddleware');
const { documentsAndPhotosUploaderMiddleware, captureFileNamesMiddleware, fileUpdateMiddleware} = require('../middleware/fileUploadMiddleware')
const {deleteWarriorByIdWithFiles, updateWarriorWithFiles, getWarriorRehabilitationsByUserId, addWarrior, getWarriors, getWarriorDetails, getPendingWarriors, updateWarrior, deleteWarrior, acceptWarrior, rejectWarrior } = require('../controllers/warriorRehabilitationController');


router.delete('/deleteById/:id', deleteWarriorByIdWithFiles)
router.put('/update/:id', documentsAndPhotosUploaderMiddleware, updateWarriorWithFiles)
router.get('/', getWarriors);
router.get('/getAllByUserId',  getWarriorRehabilitationsByUserId)
router.get('/pending', adminCheckMiddleware, getPendingWarriors);
router.get('/:id', getWarriorDetails);
router.post('/', documentsAndPhotosUploaderMiddleware, addWarrior);
router.delete('/:id', deleteWarrior);
router.put('/:id', updateWarrior);
router.put('/accept/:id', adminCheckMiddleware, acceptWarrior);
router.put('/reject/:id', adminCheckMiddleware, rejectWarrior);


module.exports = {
	warriorRehabilitationRouter: router,
};
