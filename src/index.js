import ENV from "./env"
import {dbInit} from "mongo-registry"
import {initServices} from "./services"
import {registry} from "./db/dbRegistry"
import startExpress from "express-blueforest"


const errorMapper = err => {
    if (err.code === 11000) {
        err.status = 400
        err.body = {errorCode: 1, message: "allready exists"}
    }
}

export default dbInit(ENV, registry)
    .then(initServices)
    .then(startExpress(ENV, errorMapper))
    .catch(e => console.error("BOOT ERROR\n",e))
