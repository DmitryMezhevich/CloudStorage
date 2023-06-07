const mutexServer = require('./mutex-service')
const uploadHelper = require('../helpers/upload-helper')
const ServerErrors = require('../exceptions/server-errors')

// Object for sending a file by ID to the front-end.
class UploadFiles {
    async upload(req, res, next) {
        const orderID = req.paramsPath.orderID
        const fileID = req.paramsPath.fileID

        try {
            await mutexServer.addReader(orderID)

            uploadHelper.upload(req, res, async (err) => {
                await mutexServer.removeOperation(orderID)

                if (err) {
                    return next(ServerErrors.FileIsCanNotRead(fileID))
                }
            })
        } catch {
            return next(ServerErrors.FileIsBusy(fileID))
        }
    }
}

module.exports = new UploadFiles()
