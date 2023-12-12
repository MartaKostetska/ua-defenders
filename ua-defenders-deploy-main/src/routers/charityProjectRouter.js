const express = require('express');
const router = express.Router();
const { adminCheckMiddleware } = require('../middleware/adminCheckMiddleware');
const { fileEditingMiddleware } = require('../middleware/fileEditingMiddleware');
const { documentsAndPhotosUploaderMiddleware } = require('../middleware/fileUploadMiddleware')
const { deleteProjectByIdWithFiles, deleteFileByName, getProjectsByUserId, addProject, getProjects, getProjectDetails, getPendingProjects, updateProject, deleteProject, acceptProject, rejectProject } = require('../controllers/charityProjectController');

router.delete('/deleteById/:id', deleteProjectByIdWithFiles)
router.put('/update/:id', documentsAndPhotosUploaderMiddleware, updateProject)
router.delete('/deleteFile/:filename', deleteFileByName)
router.get('/', getProjects);
router.get('/getAllByUserId', getProjectsByUserId)
router.get('/pending', adminCheckMiddleware, getPendingProjects);
router.get('/:id', getProjectDetails);
router.post('/', documentsAndPhotosUploaderMiddleware, addProject);
router.delete('/:id', fileEditingMiddleware, deleteProject);
router.patch('/:id', fileEditingMiddleware, updateProject);
router.put('/accept/:id', adminCheckMiddleware, acceptProject);
router.put('/reject/:id', adminCheckMiddleware, rejectProject);


module.exports = {
	charityProjectRouter: router,
};
