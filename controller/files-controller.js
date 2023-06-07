const downloadService = require('../service/downloadFiles-service')
const uploadService = require('../service/uploadFiles-service')
const removeService = require('../service/removeFiles-service')

class FilesController {
    async downloadFilesByOrder(req, res, next) {
        downloadService.download(req, res, next)
    }

    async uploadFile(req, res, next) {
        uploadService.upload(req, res, next)
    }

    async removeFile(req, res, next) {
        removeService.removeFile(req, res, next)
    }

    async removeOrder(req, res, next) {
        removeService.removeFolder(req, res, next)
    }
}

module.exports = new FilesController()
