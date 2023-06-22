const UserErrors = require('../exceptions/user-errors');

class ValidateQuery {
    _addParams(req, next) {
        req.paramsPath = {
            fileID: req.query.fileID,
            orderID: req.query.orderID,
        };

        next();
    }

    async getFile(req, res, next) {
        if (!req.query.orderID || !req.query.fileID) {
            return next(UserErrors.BadRequestWithQuery());
        }

        this._addParams(req, next);
    }

    async postFiles(req, res, next) {
        if (!req.query.orderID) {
            return next(UserErrors.BadRequestWithQuery());
        }

        this._addParams(req, next);
    }

    async removeFile(req, res, next) {
        if (!req.query.orderID || !req.query.fileID) {
            return next(UserErrors.BadRequestWithQuery());
        }

        this._addParams(req, next);
    }

    async removeOrder(req, res, next) {
        if (!req.query.orderID) {
            return next(UserErrors.BadRequestWithQuery());
        }

        this._addParams(req, next);
    }
}

module.exports = new ValidateQuery();
