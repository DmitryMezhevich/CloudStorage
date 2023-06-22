const fs = require('fs');

class WreterFiles {
    _rename(listFiles, orderID) {
        const newPath = `${__dirname}/../localDatabase/files/${orderID}`;

        if (!fs.existsSync(newPath)) {
            fs.mkdirSync(newPath);
        }

        Object.entries(listFiles).forEach(([_, value]) => {
            fs.renameSync(
                value.filepath,
                newPath + '/' + value.originalFilename
            );
        });
    }

    _removeBuffer(listFiles) {
        Object.entries(listFiles).forEach(([_, value]) => {
            fs.unlinkSync(value.filepath);
        });
    }

    write(err, orderID, listFiles) {
        return new Promise((resolve, reject) => {
            if (err) {
                this._removeBuffer(listFiles);
                reject(err);
            }

            this._rename(listFiles, orderID);
            resolve();
        });
    }
}

module.exports = new WreterFiles();
