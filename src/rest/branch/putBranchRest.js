import {BRANCH_QT, BRANCH_UNIT, TRUNK_QT, TRUNK_UNIT} from "../../const/paths"
import {branchIdIsNotTrunkId, validBranchId, validTrunkId, present} from "../../const/validations"
import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"
import configure from "items-service"

import {run} from 'express-json-api'
import {Router} from "express-json-api"; const router = Router()

const upsertBranch = configure(() => col(cols.BRANCH)).upsertItem

module.exports = router

router.put('/api/branch',
    validBranchId,
    validTrunkId,
    branchIdIsNotTrunkId,
    present(BRANCH_QT, BRANCH_UNIT, TRUNK_QT, TRUNK_UNIT),
    run(({trunk, branch}) => upsertBranch(trunk, branch))
)