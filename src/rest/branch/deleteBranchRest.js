import {validPathId} from "../validations"
import {cols} from "../../const/collections"
import {col} from "mongo-registry"
import configure from "items-service"

import {run} from 'express-blueforest'
const router = require("express-blueforest").Router()

const deleteBranch = configure(() => col(cols.BRANCH)).deleteOne

module.exports = router

router.delete('/api/tree/branch/:_id',
    validPathId,
    run(deleteBranch)
)