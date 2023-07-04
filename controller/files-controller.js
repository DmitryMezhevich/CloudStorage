const filesService = require('../service/files-service');

class FilesController {
    async downloadFilesByOrder(req, res, next) {
        filesService.download(req, res, next);
    }

    async uploadFile(req, res, next) {
        filesService.upload(req, res, next);
    }

    async removeFile(req, res, next) {
        filesService.removeFile(req, res, next);
    }

    async removeOrder(req, res, next) {
        filesService.removeFolder(req, res, next);
    }
}

module.exports = new FilesController();
