const fs = require('fs-extra');

class FilesHelper {
    _rename(listFiles, orderID) {
        const newPath = `${__dirname}/../localDatabase/files/${orderID}`;

        fs.stat(newPath, async (err) => {
            if (err) {
                await fs.mkdir(newPath);
            }

            Object.entries(listFiles).forEach(async ([, value]) => {
                await fs.rename(
                    value.filepath,
                    newPath + '/' + value.originalFilename
                );
            });
        });
    }

    _removeBuffer(listFiles) {
        Object.entries(listFiles).forEach(async ([, value]) => {
            await fs.unlink(value.filepath);
        });
    }

    write(err, orderID, listFiles) {
        return new Promise((resolve, reject) => {
            if (err) {
                this._removeBuffer(listFiles);
                return reject(err);
            }

            this._rename(listFiles, orderID);
            resolve();
        });
    }

    upload(req, res, cb) {
        const orderID = req.paramsPath.orderID;
        const fileID = req.paramsPath.fileID;

        const readStream = fs.createReadStream(
            `${__dirname}/../localDatabase/files/${orderID}/${fileID}`
        );

        readStream.on('open', () => {
            res.setHeader(
                'content-disposition',
                `attachment; filename=${encodeURIComponent(fileID)}`
            );
            readStream.pipe(res);
        });

        readStream.once('error', (err) => {
            return cb(err);
        });

        res.on('close', async () => {
            return cb();
        });
    }

    removeFile(path) {
        return new Promise((resolve, reject) => {
            fs.unlink(path, (err) => {
                if (err) {
                    return reject(err);
                }

                resolve();
            });
        });
    }

    removeFolder(path) {
        return new Promise((resolve, reject) => {
            fs.remove(path, (err) => {
                if (err) {
                    return reject(err);
                }

                resolve();
            });
        });
    }
}

module.exports = new FilesHelper();
