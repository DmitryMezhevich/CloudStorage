const fs = require('fs').promises;
const path = require('path');

class GetFilesList {
    async _readDirectoryRecursive(directoryPath) {
        const files = await fs.readdir(directoryPath);

        const filePromises = files.map(async (file) => {
            if (file === '.DS_Store') {
                return null;
            }

            const filePath = path.join(directoryPath, file);

            const stats = await fs.stat(filePath);

            if (stats.isDirectory()) {
                const children = await this._readDirectoryRecursive(filePath);

                return {
                    orderID: file,
                    type: 'directory',
                    children,
                };
            } else {
                return {
                    name: file,
                    type: 'file',
                };
            }
        });
        return Promise.all(filePromises);
    }

    async readFiles(directoryPath) {
        const result = await this._readDirectoryRecursive(directoryPath);
        return result.filter((item) => item !== null);
    }
}

module.exports = new GetFilesList();
