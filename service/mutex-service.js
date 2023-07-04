const { Mutex } = require('async-mutex');

const Operation = require('../helpers/operation-helper');
const ServiceError = require('../exceptions/server-errors');

class MutexServer {
    // Private propety
    #globalMutex = new Mutex();
    #divOperations = new Map();

    #currentOperation(orderID) {
        return this.#divOperations.get(orderID);
    }

    #addOperation(orderID) {
        this.#divOperations.set(orderID, new Operation());
        return this.#currentOperation(orderID);
    }

    // If the value of the property #counterOfReader is 0 (of the Operation object),
    // it can be approve that the operation has finished reading or writing the file.
    #removeOperation(orderID) {
        this.#currentOperation(orderID).removeReader();
        if (!this.#currentOperation(orderID).isReading()) {
            this.#divOperations.delete(orderID);
        }
    }

    // Adds a new operation for writing a file. Throws an error if the operation already exists.
    async addWriter(orderID) {
        return this.#globalMutex.acquire().then((release) => {
            if (!this.#currentOperation(orderID)) {
                this.#addOperation(orderID);
                return release();
            }

            release();
            throw ServiceError.OrderIsBusy(orderID);
        });
    }

    // Adds a new operation for reading a file or increments the reader counter
    // if the operation already exists for reading the file.
    // Throws an error if the operation already exists for writing the file.
    async addReader(orderID, fileID) {
        return this.#globalMutex.acquire().then((release) => {
            if (!this.#currentOperation(orderID)) {
                this.#addOperation(orderID).addReader();
                return release();
            }

            if (this.#currentOperation(orderID).isReading()) {
                this.#currentOperation(orderID).addReader();
                return release();
            }

            release();
            throw ServiceError.FileIsBusy(fileID);
        });
    }

    // Removes the operation for reading or writing a file.
    async removeOperation(orderID) {
        return this.#globalMutex.acquire().then((release) => {
            this.#removeOperation(orderID);
            return release();
        });
    }
}

module.exports = new MutexServer();
