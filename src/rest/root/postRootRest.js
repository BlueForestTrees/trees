import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {rootIdIsNotTrunkId, validBodyBqt, validBodyOptRelativeTo, validBodyId, validBodyTrunkId, validBodyRootId} from "../validations"
import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"
import configure from "items-service"
import {cleanNull} from "../../util/calculations"

const router = Router()
const insertRoot = configure(() => col(cols.ROOT)).insertOne

module.exports = router

router.post('/api/root',
    validBodyId,
    validBodyTrunkId,
    validBodyRootId,
    validBodyOptRelativeTo,
    validBodyBqt,
    rootIdIsNotTrunkId,
    run(cleanNull("relativeTo")),
    run(insertRoot)
)