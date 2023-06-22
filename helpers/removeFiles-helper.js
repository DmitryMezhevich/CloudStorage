const fs = require('fs-extra');

class RemoveFiles {
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

module.exports = new RemoveFiles();
