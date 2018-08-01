import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {valid, validMongoId} from "../../const/validations"
import configure from "items-service"
import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"

const router = Router()

const deleteRoot = configure(() => col(cols.ROOT)).removeItem
module.exports = router

router.delete('/api/root/:trunkId/:rootId',
    validMongoId("trunkId"),
    validMongoId("rootId"),
    run(({trunkId, rootId}) => deleteRoot(trunkId, rootId))
)