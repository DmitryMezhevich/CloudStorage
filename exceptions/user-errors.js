class UserErrors extends Error {
    httpStatus;

    constructor(httpStatus, message) {
        super(message);
        this.httpStatus = httpStatus;
    }

    static BadRequestWithQuery(message = 'You must have correct query!') {
        return new UserErrors(400, message);
    }
}

module.exports = UserErrors;
