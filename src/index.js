import ENV from "./env"
import {dbInit} from "trees-db-version/dist"
import {initServices} from "./services"
import {registry} from "./db/dbRegistry"
import {ALLREADY_EXISTS} from "./exceptions/errorCatalog"
import startExpress from "trees-express"



const errorAdapter = function (err) {
    if (err.code === 11000) {
        err.status = 400
        err.body = ALLREADY_EXISTS
    }
}

export default dbInit(ENV, registry)
    .then(initServices)
    .then(startExpress(ENV, errorAdapter))
