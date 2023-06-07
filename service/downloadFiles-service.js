const formidableHelper = require('../helpers/formidable-helper')
const mutexServer = require('./mutex-service')
const ServerErrors = require('../exceptions/server-errors')

// Object for uploading a file with fornt
class DownloadFiles {
    async download(req, res, next) {
        const orderID = req.paramsPath.orderID

        try {
            await mutexServer.addWriter(orderID)

            await formidableHelper.download(req, orderID, async (err) => {
                await mutexServer.removeOperation(orderID)

                if (err) {
                    return next(ServerErrors.ErrorUpload())
                }

                res.json({ description: 'File(-s) was upload!' })
            })
        } catch {
            return next(ServerErrors.OrderIsBusy(orderID))
        }
    }
}

module.exports = new DownloadFiles()
