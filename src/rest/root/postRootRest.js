import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {validRootId, validTrunkId, rootIdIsNotTrunkId, validId, validBodyBqt, validOptionalRelativeTo} from "../../const/validations"
import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"
import configure from "items-service"
import {cleanNull} from "../../util/calculations"

const router = Router()
const insertRoot = configure(() => col(cols.ROOT)).insertOne

module.exports = router

router.post('/api/root',
    validId,
    validTrunkId,
    validRootId,
    validOptionalRelativeTo,
    rootIdIsNotTrunkId,
    validBodyBqt,
    run(cleanNull("relativeTo")),
    run(insertRoot)
)