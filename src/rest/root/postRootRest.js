import {run} from 'express-json-api'
import {Router} from "express-json-api"
import {validRootId, validTrunkId, rootIdIsNotTrunkId} from "../../const/validations"
import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"
import configure from "items-service"

const router = Router()
const insertRoot = configure(() => col(cols.ROOT)).insertItem

module.exports = router

router.post('/api/root',
    validTrunkId,
    validRootId,
    rootIdIsNotTrunkId,
    run(({trunk, root}) => insertRoot(trunk, root))
)