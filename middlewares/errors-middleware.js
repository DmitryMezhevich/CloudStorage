const UserErrors = require('../exceptions/user-errors');
const ServerErrors = require('../exceptions/server-errors');

module.exports = function (err, req, res, next) {
    console.log(err);
    if (err instanceof UserErrors || err instanceof ServerErrors) {
        return res.status(err.httpStatus).json({ description: err.message });
    }

    return res.status(500).json({ message: 'Unexpected error' });
};
