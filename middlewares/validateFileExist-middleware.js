const ServerErrors = require('../exceptions/server-errors');
const path = require('path');
const fs = require('fs');

class ValidateExit {
    _path(orderID, fileID) {
        return path.join('localDatabase/files/', orderID, fileID ? fileID : '');
    }

    async fileExit(req, res, next) {
        fs.stat(
            this._path(req.paramsPath.orderID, req.paramsPath.fileID),
            (err) => {
                if (err) {
                    return next(
                        ServerErrors.FileNotExist(req.paramsPath.fileID)
                    );
                }

                next();
            }
        );
    }

    async folderExit(req, res, next) {
        fs.stat(this._path(req.paramsPath.orderID), (err) => {
            if (err) {
                return next(ServerErrors.OrderNotExist(req.paramsPath.orderID));
            }

            next();
        });
    }
}

module.exports = new ValidateExit();
