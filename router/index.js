// Router
const Router = require('express').Router;
const router = new Router();
// Controllers
const userController = require('../controller/user-controller');
const filesController = require('../controller/files-controller');
// Validate
const validateQuery = require('../middlewares/validateQuery-middleware');
const validateFile = require('../middlewares/validateFileExist-middleware');

// Get a list of all files in the local database
router.get('/listFiles', userController.getAllFilesList);

// Get the file with the order ID
router.get(
    '/downloadFile',
    validateQuery.getFile.bind(validateQuery),
    validateFile.fileExit.bind(validateFile),
    filesController.uploadFile
);

// Post the file(-s) with order ID
router.post(
    '/uploadFiles',
    validateQuery.postFiles.bind(validateQuery),
    filesController.downloadFilesByOrder
);

// Delete the file with order ID and file ID
router.delete(
    '/deleteFile',
    validateQuery.removeFile.bind(validateQuery),
    validateFile.fileExit.bind(validateFile),
    filesController.removeFile
);

// Delete the order with order ID
router.delete(
    '/deleteOrder',
    validateQuery.removeOrder.bind(validateQuery),
    validateFile.folderExit.bind(validateFile),
    filesController.removeOrder
);

module.exports = router;
