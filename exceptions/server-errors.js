class ServerErrors extends Error {
    httpStatus;

    constructor(httpStatus = 500, message) {
        super(message);
        this.httpStatus = httpStatus;
    }

    static FileNotExist(nameOrder, nameFile) {
        return new ServerErrors(
            undefined,
            `Order or file: '${
                nameFile ? nameFile : nameOrder
            }' does not exist!`
        );
    }

    static FileIsBusy(nameFile) {
        return new ServerErrors(
            undefined,
            `File: '${nameFile}' is temporarily blocked! Repeat the request later.`
        );
    }

    static OrderIsBusy(nameOrder) {
        return new ServerErrors(
            undefined,
            `Order: '${nameOrder}' is temporarily blocked! Repeat the request later.`
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

    static ErrorRemoveOrder(nameOrder) {
        return new ServerErrors(
            undefined,
            `Order: '${nameOrder}' cannot be remove!`
        );
    }
}

module.exports = ServerErrors;
