const getFilesHelper = require('../helpers/getFilesList-helper')
const ServerErrors = require('../exceptions/server-errors')

class UserController {
    async getAllFilesList(req, res, next) {
        try {
            const list = await getFilesHelper.readDirectoryRecursive(
                'localDatabase/files'
            )

            if (!list.length) {
                return res.json({ description: 'The list is empty!' })
            }

            res.json(list)
        } catch {
            return next(ServerErrors.ErrorReadFilesList())
        }
    }
}

module.exports = new UserController()
