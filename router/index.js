// Router
const Router = require('express').Router;
const router = new Router();
// Controllers
const userController = require('../controller/user-controller');
const filesController = require('../controller/files-controller');
// Validate
const validateFileExist = require('../middlewares/validateFileExist-middleware');

// Get a list of all files in the local database
router.get('/orders', userController.getAllFilesList);

// Get the file with the order ID
router.get(
    '/orders/:orderID/files/:fileID',
    validateFileExist.check.bind(validateFileExist),
    filesController.uploadFile
);

// Post the file(-s) with order ID
router.post('/orders/:orderID', filesController.downloadFilesByOrder);

// Delete the file with order ID and file ID
router.delete(
    '/orders/:orderID/files/:fileID',
    validateFileExist.check.bind(validateFileExist),
    filesController.removeFile
);

// Delete the order with order ID
router.delete(
    '/orders/:orderID',
    validateFileExist.check.bind(validateFileExist),
    filesController.removeOrder
);

module.exports = router;
