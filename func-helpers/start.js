const fs = require('fs');

module.exports = function () {
    if (!fs.existsSync('./localDatabase')) {
        fs.mkdirSync('./localDatabase');
    }

    if (!fs.existsSync('./localDatabase/buffer')) {
        fs.mkdirSync('./localDatabase/buffer');
    }

    if (!fs.existsSync('localDatabase/files')) {
        fs.mkdirSync('localDatabase/files');
    }
};
