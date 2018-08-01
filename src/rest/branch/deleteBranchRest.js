import {valid} from "../../const/validations"
import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"
import configure from "items-service"

import {run} from 'express-json-api'
const router = require("express-json-api").Router()

const deleteBranch = configure(() => col(cols.BRANCH)).removeItem

module.exports = router

router.delete('/api/branch/:trunkId/:branchId',
    valid("trunkId"),
    valid("branchId"),
    run(({trunkId, branchId}) => deleteBranch(trunkId, branchId))
)