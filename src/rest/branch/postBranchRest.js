import {branchIdIsNotTrunkId, validBodyBqt, validBodyBranchId, validBodyId, validBodyTrunkId, validBranchId, validTrunkId} from "../validations"
import configure from "items-service"
import {cols} from "../../const/collections"
import {col} from "mongo-registry"

import {run} from 'express-blueforest'
import {Router} from "express-blueforest"

const router = Router()

const branchService = configure(() => col(cols.BRANCH))

module.exports = router

router.post('/api/branch',
    [
        validBodyId,
        validBodyTrunkId,
        validBodyBranchId,
        validBodyBqt,
        branchIdIsNotTrunkId
    ],
    run(branchService.insertOne)
)