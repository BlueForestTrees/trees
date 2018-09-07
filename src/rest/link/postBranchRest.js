import {
    branchIdIsNotTrunkId,
    setUserIdIn,
    validBodyBqt,
    validBodyBranchId,
    validBodyId,
    validBodyTrunkId, validUser
} from "../validations"
import configure from "items-service"
import {cols} from "../../const/collections"
import {col} from "mongo-registry"

import {run} from 'express-blueforest'
import {Router} from "express-blueforest"

const router = Router()

const rootService = configure(() => col(cols.ROOT))

module.exports = router

const branchToRoot = ({_id, trunkId, branchId, bqt}) => ({_id, trunkId: branchId, rootId: trunkId, bqt: 1 / bqt})

router.post('/api/tree/branch',
    [
        validBodyId,
        validBodyTrunkId,
        validBodyBranchId,
        validBodyBqt,
        branchIdIsNotTrunkId
    ],
    run(branchToRoot),
    validUser,
    run(setUserIdIn("oid")),
    run(rootService.insertOne),
    run(({result}) => result)
)