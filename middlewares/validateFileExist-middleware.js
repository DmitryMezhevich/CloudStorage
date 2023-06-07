const ServerErrors = require('../exceptions/server-errors')
const path = require('path')
const fs = require('fs')

class ValidateExit {
    _path(orderID, fileID) {
        return path.join('localDatabase/files/', orderID, fileID ? fileID : '')
    }

    async fileExit(req, res, next) {
        if (
            !fs.existsSync(
                this._path(req.paramsPath.orderID, req.paramsPath.fileID)
            )
        ) {
            return next(ServerErrors.FileNotExist(req.paramsPath.fileID))
        }

        next()
    }

    async folderExit(req, res, next) {
        console.log(this._path(req.paramsPath.orderID))
        if (!fs.existsSync(this._path(req.paramsPath.orderID))) {
            return next(ServerErrors.OrderNotExist(req.paramsPath.orderID))
        }

        next()
    }
}

module.exports = new ValidateExit()
