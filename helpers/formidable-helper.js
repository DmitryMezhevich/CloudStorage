const formidable = require('formidable');
const writeHepler = require('./files-helper');

class FormidableDownload {
    _optionsFormidable = {
        uploadDir: `${__dirname}/../localDatabase/buffer`,
        keepExtensions: true,
        maxFileSize: 4 * 1024 * 1024 * 1024,
        multiples: true,
    };

    async download(req, orderID, cb) {
        const form = formidable(this._optionsFormidable);

        form.parse(req, (err, _, files) => {
            writeHepler
                .write(err, orderID, files)
                .then(() => {
                    return cb();
                })
                .catch((err) => {
                    return cb(err);
                });
        });
    }
}

module.exports = new FormidableDownload();
