import {branchIdIsNotTrunkId, validBranchId, validTrunkId, validBodyBqt, validId, validBodyOptRelativeTo} from "../validations"
import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"
import configure from "items-service"

import {run} from 'express-blueforest'
import {Router} from "express-blueforest"; const router = Router()

const branchService = configure(() => col(cols.BRANCH))

module.exports = router

router.put('/api/branch',
    validId,
    validTrunkId,
    validBranchId,
    validBodyBqt,
    branchIdIsNotTrunkId,
    run(({_id, trunkId, branchId, bqt}) => ({filter: {_id, trunkId, branchId}, item: {bqt}})),
    run(branchService.filteredUpdate)
)