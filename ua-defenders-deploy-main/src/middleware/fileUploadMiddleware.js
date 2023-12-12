const multer = require('multer');
const path = require('path');
const fs = require("fs");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '../../uploads');
        cb(null, uploadPath)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const documentsAndPhotosUploaderMiddleware = multer({storage })
    .fields([{name: 'documents', maxCount: 3}, {name: 'photos', maxCount: 1}])

module.exports = { documentsAndPhotosUploaderMiddleware }
