import ENV from "./env"
import {dbInit} from "mongo-registry/dist"
import {initServices} from "./services"
import {registry} from "./db/dbRegistry"
import startExpress from "express-blueforest"
import morgan from "morgan"

const errorMapper = err => {
    if (err.code === 11000) {
        err.status = 400
        err.body = {errorCode: 1, message: "allready exists"}
    }
}
const init = api => api.use(morgan(ENV.MORGAN || ':status :method :url :response-time ms - :res[content-length]'))

export default dbInit(ENV, registry)
    .then(initServices)
    .then(startExpress(ENV, errorMapper, init))
