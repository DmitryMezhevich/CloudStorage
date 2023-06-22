const UserErrors = require('../exceptions/user-errors');
const ServerErrors = require('../exceptions/server-errors');

// eslint-disable-next-line no-unused-vars
module.exports = function (err, req, res, next) {
    if (err instanceof UserErrors || err instanceof ServerErrors) {
        return res.status(err.httpStatus).json({ description: err.message });
    }

    return res.status(500).json({ message: 'Unexpected error' });
};
