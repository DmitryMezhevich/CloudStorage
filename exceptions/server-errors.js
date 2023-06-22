class ServerErrors extends Error {
    httpStatus;

    constructor(httpStatus = 500, message) {
        super(message);
        this.httpStatus = httpStatus;
    }

    static FileNotExist(nameFile) {
        return new ServerErrors(
            undefined,
            `File: '${nameFile}' does not exist!`
        );
    }

    static OrderNotExist(orderID) {
        return new ServerErrors(
            undefined,
            `Order: '${orderID}' does not exist!`
        );
    }

    static FileIsBusy(nameFile) {
        return new ServerErrors(
            undefined,
            `File: '${nameFile}' is temporarily blocked! Repeat the request later.`
        );
    }

    static OrderIsBusy(orderID) {
        return new ServerErrors(
            undefined,
            `Order: '${orderID}' is temporarily blocked! Repeat the request later.`
        );
    }

    static FileIsCanNotRead(nameFile) {
        return new ServerErrors(
            undefined,
            `File: '${nameFile}' cannot be read!`
        );
    }

    static ErrorUpload() {
        return new ServerErrors(undefined, `Error upload!`);
    }

    static ErrorReadFilesList() {
        return new ServerErrors(undefined, `Error getting the list of files!`);
    }

    static ErrorRemoveFile(nameFile) {
        return new ServerErrors(
            undefined,
            `File: '${nameFile}' cannot be remove!`
        );
    }

    static ErrorRemoveOrder(orderID) {
        return new ServerErrors(
            undefined,
            `Order: '${orderID}' cannot be remove!`
        );
    }
}

module.exports = ServerErrors;
