const createReadStream = require('fs').createReadStream;

const formidable = require('formidable');

const filesHepler = require('./files-helper');
const ServerErrors = require('../exceptions/server-errors');
const sizeConstants = require('../constants')

class DownloadHelper {
    #optionsFormidable = {
        uploadDir: `${__dirname}/../localDatabase/buffer`,
        keepExtensions: true,
        maxFileSize: 4 * sizeConstants.ONE_GB,
        multiples: true,
    };

    async download(req, orderID) {
        return new Promise((resolve, reject) => {
            const form = formidable(this.#optionsFormidable);

            form.parse(req, async (err, _, files) => {
                try {
                    await filesHepler.write(err, orderID, files);
                } catch {
                    return reject(ServerErrors.ErrorUpload());
                }
                resolve();
            });
        });
    }

    async upload(req, res) {
        return new Promise((resolve, reject) => {
            const { orderID, fileID } = req.params;

            const readStream = createReadStream(
                `${__dirname}/../localDatabase/files/${orderID}/${fileID}`
            );

            readStream.on('open', () => {
                res.setHeader(
                    'content-disposition',
                    `attachment; filename=${encodeURIComponent(fileID)}`
                );
                readStream.pipe(res);
            });

            readStream.once('error', () => {
                return reject(ServerErrors.FileIsCanNotRead(fileID));
            });

            res.on('close', async () => {
                return resolve();
            });
        });
    }
}

module.exports = new DownloadHelper();
