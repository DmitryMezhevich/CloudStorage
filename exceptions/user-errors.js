class UserErrors extends Error {
    _httpStatus

    constructor(httpStatus, message) {
        super(message)
        this._httpStatus = httpStatus
    }

    static BadRequestWithQuery(message = 'You must have correct query!') {
        return new UserErrors(400, message)
    }
}

module.exports = UserErrors
