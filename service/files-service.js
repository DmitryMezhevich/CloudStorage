const mutexService = require('./mutex-service');
const downloadHelper = require('../helpers/download-helper');
const filesHelper = require('../helpers/files-helper');

class FilesService {
    async removeFile(req, res, next) {
        const { orderID, fileID } = req.params;

        try {
            await mutexService.addWriter(orderID);
        } catch (err) {
            return next(err);
        }

        try {
            await filesHelper.removeFile(orderID, fileID);

            res.json({
                descripthin: `File: '${fileID}' has been remove!`,
            });
        } catch (err) {
            return next(err);
        } finally {
            await mutexService.removeOperation(orderID);
        }
    }

    async removeFolder(req, res, next) {
        const { orderID } = req.params;

        try {
            await mutexService.addWriter(orderID);
        } catch (err) {
            return next(err);
        }

        try {
            await filesHelper.removeFolder(orderID);

            res.json({
                descripthin: `Order: '${orderID}' has been remove!`,
            });
        } catch (err) {
            return next(err);
        } finally {
            await mutexService.removeOperation(orderID);
        }
    }

    async download(req, res, next) {
        const { orderID } = req.params;

        try {
            await mutexService.addWriter(orderID);
        } catch (err) {
            return next(err);
        }

        try {
            await downloadHelper.download(req, orderID);

            res.json({ description: 'File(-s) was upload!' });
        } catch (err) {
            return next(err);
        } finally {
            await mutexService.removeOperation(orderID);
        }
    }

    async upload(req, res, next) {
        const { orderID, fileID } = req.params;

        try {
            await mutexService.addReader(orderID, fileID);
        } catch (err) {
            return next(err);
        }

        try {
            await downloadHelper.upload(req, res);
        } catch (err) {
            return next(err);
        } finally {
            await mutexService.removeOperation(orderID);
        }
    }
}

module.exports = new FilesService();
