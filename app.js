require('dotenv').config()
const express = require('express')
const router = require('./router/index')
const errorMiddleware = require('./middlewares/errors-middleware')
const preparingForStart = require('./func-helpers/start')

try {
    preparingForStart()

    const PORT = process.env.PORT || 3000
    const app = express()

    app.use(express.urlencoded({ extended: true }))
    app.use('/API', router)
    app.use(errorMiddleware)

    app.listen(PORT, () => console.log(`Server is started by ${PORT} port!`))
} catch (err) {
    return console.log(err)
}
