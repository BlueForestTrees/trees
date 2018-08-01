import {run} from 'express-json-api'
import {Router} from "express-json-api"
import {valid} from "../../const/validations"
import configure from "items-service"
import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"

const router = Router()

const deleteRoot = configure(() => col(cols.ROOT)).removeItem
module.exports = router

router.delete('/api/root/:trunkId/:rootId',
    valid("trunkId"),
    valid("rootId"),
    run(({trunkId, rootId}) => deleteRoot(trunkId, rootId))
)