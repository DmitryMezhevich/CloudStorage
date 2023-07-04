const path = require('path');
const fs = require('fs/promises');

const ServerErrors = require('../exceptions/server-errors');

class FilesHelper {
    #path(orderID, fileID) {
        return path.join(
            __dirname,
            '..',
            'localDatabase/files/',
            orderID,
            fileID ? fileID : ''
        );
    }

    async #rename(listFiles, orderID) {
        const newPath = this.#path(orderID);

        await fs.mkdir(newPath, { recursive: true });

        for (const [, value] of Object.entries(listFiles)) {
            await fs.rename(
                value.filepath,
                newPath + '/' + value.originalFilename
            );
        }
    }

    async #removeBuffer(listFiles) {
        for (const [, value] of Object.entries(listFiles)) {
            await fs.unlink(value.filepath);
        }
    }

    async write(err, orderID, listFiles) {
        try {
            if (err) {
                await this.#removeBuffer(listFiles);
                throw err;
            }

            await this.#rename(listFiles, orderID);
        } catch {
            throw err;
        }
    }

    async removeFile(orderID, fileID) {
        try {
            await fs.unlink(this.#path(orderID, fileID));
        } catch {
            throw ServerErrors.ErrorRemoveFile(fileID);
        }
    }

    async removeFolder(orderID) {
        try {
            await fs.rm(this.#path(orderID), {
                recursive: true,
                force: true,
            });
        } catch {
            throw ServerErrors.ErrorRemoveOrder(orderID);
        }
    }
}

module.exports = new FilesHelper();
