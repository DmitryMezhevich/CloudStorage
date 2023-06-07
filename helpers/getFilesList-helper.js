const fs = require('fs').promises
const path = require('path')

class GetFilesList {
    async readDirectoryRecursive(directoryPath) {
        const files = await fs.readdir(directoryPath)

        const filePromises = files.map(async (file) => {
            const filePath = path.join(directoryPath, file)

            const stats = await fs.stat(filePath)

            if (stats.isDirectory()) {
                const children = await this.readDirectoryRecursive(filePath)
                
                return {
                    orderID: file,
                    type: 'directory',
                    children,
                }
            } else {
                return {
                    name: file,
                    type: 'file',
                }
            }
        })

        return Promise.all(filePromises)
    }
}

module.exports = new GetFilesList()
