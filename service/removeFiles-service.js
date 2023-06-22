const path = require('path');
const ServerError = require('../exceptions/server-errors');
const mutexService = require('../service/mutex-service');
const removeHelper = require('../helpers/files-helper');

class RemoveFiles {
    _path(orderId, fileID) {
        return path.join('localDatabase/files/', orderId, fileID ? fileID : '');
    }

    async removeFile(req, res, next) {
        const orderID = req.paramsPath.orderID;
        const fileID = req.paramsPath.fileID;

        try {
            await mutexService.addWriter(orderID);

            removeHelper
                .removeFile(this._path(orderID, fileID))
                .then(() => {
                    res.json({
                        descripthin: `File: '${fileID}' has been remove!`,
                    });
                })
                .catch(() => {
                    return next(ServerError.ErrorRemoveFile(fileID));
                })
                .finally(async () => {
                    await mutexService.removeOperation(orderID);
                });
        } catch {
            return next(ServerError.OrderIsBusy(orderID));
        }
    }

    async removeFolder(req, res, next) {
        const orderID = req.paramsPath.orderID;

        try {
            await mutexService.addWriter(orderID);

            removeHelper
                .removeFolder(this._path(orderID))
                .then(() => {
                    res.json({
                        descripthin: `Order: '${orderID}' has been remove!`,
                    });
                })
                .catch(() => {
                    return next(ServerError.ErrorRemoveOrder(orderID));
                })
                .finally(async () => {
                    await mutexService.removeOperation(orderID);
                });
        } catch {
            return next(ServerError.OrderIsBusy(orderID));
        }
    }
}

module.exports = new RemoveFiles();
