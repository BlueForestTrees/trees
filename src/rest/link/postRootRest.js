import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {
    rootIdIsNotTrunkId,
    validBodyBqt,
    validBodyOptRelativeTo,
    validBodyId,
    validBodyTrunkId,
    validBodyRootId,
    validUser, setUserIdIn
} from "../validations"
import {cols} from "../../const/collections"
import {col} from "mongo-registry"
import configure from "items-service"
import {cleanNull} from "../../util/calculations"

const router = Router()
const insertRoot = configure(() => col(cols.ROOT)).insertOne

module.exports = router

router.post('/api/tree/root',
    validBodyId,
    validBodyTrunkId,
    validBodyRootId,
    validBodyOptRelativeTo,
    validBodyBqt,
    rootIdIsNotTrunkId,
    validUser,
    run(setUserIdIn("oid")),
    run(cleanNull("relativeTo")),
    run(insertRoot),
    run(({result}) => result)
)