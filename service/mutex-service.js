const { Mutex } = require('async-mutex')
const Operation = require('../helpers/operation-helper')

class MutexServer {
    // Private propety
    _globalMutex = new Mutex()
    _divOperations = new Map()

    _currentOperation(orderID) {
        return this._divOperations.get(orderID)
    }

    _addOperation(orderID) {
        this._divOperations.set(orderID, new Operation())
        return this._currentOperation(orderID)
    }

    // If the value of the property _counterOfReader is 0 (of the Operation object),
    // it can be approve that the operation has finished reading or writing the file.
    _removeOperation(orderID) {
        this._currentOperation(orderID).removeReader()
        if (!this._currentOperation(orderID).isReading()) {
            this._divOperations.delete(orderID)
        }
    }

    // Adds a new operation for writing a file. Throws an error if the operation already exists.
    async addWriter(orderID) {
        return this._globalMutex.acquire().then((release) => {
            if (!this._currentOperation(orderID)) {
                this._addOperation(orderID)
                return release()
            }

            release()
            throw new Error()
        })
    }

    // Adds a new operation for reading a file or increments the reader counter
    // if the operation already exists for reading the file.
    // Throws an error if the operation already exists for writing the file.
    async addReader(orderID) {
        return this._globalMutex.acquire().then((release) => {
            if (!this._currentOperation(orderID)) {
                this._addOperation(orderID).addReader()
                return release()
            }

            if (this._currentOperation(orderID).isReading()) {
                this._currentOperation(orderID).addReader()
                return release()
            }

            release()
            throw new Error()
        })
    }

    // Removes the operation for reading or writing a file.
    async removeOperation(orderID) {
        return this._globalMutex.acquire().then((release) => {
            this._removeOperation(orderID)
            return release()
        })
    }
}

module.exports = new MutexServer()
