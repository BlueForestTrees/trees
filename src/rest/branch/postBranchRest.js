import {branchIdIsNotTrunkId, validBranchId, validTrunkId} from "../../const/validations"
import configure from "items-service"
import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"

import {run} from 'express-json-api'
import {Router} from "express-json-api"; const router = Router()

const insertBranch = configure(() => col(cols.BRANCH)).insertItem

module.exports = router

router.post('/api/branch',
    [
        validTrunkId,
        validBranchId,
        branchIdIsNotTrunkId
    ],
    run(({trunk, branch}) => insertBranch(trunk, branch))
)