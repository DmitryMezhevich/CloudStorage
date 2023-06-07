const fs = require('fs')

class UploadHelper {
    upload(req, res, cb) {
        const orderID = req.paramsPath.orderID
        const fileID = req.paramsPath.fileID

        const readStream = fs.createReadStream(
            `${__dirname}/../localDatabase/files/${orderID}/${fileID}`
        )

        readStream.on('open', () => {
            res.setHeader(
                'content-disposition',
                `attachment; filename=${encodeURIComponent(fileID)}`
            )
            readStream.pipe(res)
        })

        readStream.once('error', (err) => {
            return cb(err)
        })

        res.on('close', async () => {
            return cb()
        })
    }
}

module.exports = new UploadHelper()
