const path = require('path');
const fs = require('fs/promises');

const ServerErrors = require('../exceptions/server-errors');

class ValidateExit {
    #path(orderID, fileID) {
        return path.join(
            __dirname,
            '..',
            'localDatabase/files/',
            orderID,
            fileID ? fileID : ''
        );
    }

    async check(req, res, next) {
        const { orderID, fileID } = req.params;

        try {
            await fs.stat(this.#path(orderID, fileID));

            next();
        } catch {
            return next(ServerErrors.FileNotExist(orderID, fileID));
        }
    }
}

module.exports = new ValidateExit();
