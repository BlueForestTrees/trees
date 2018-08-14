import {validPathId} from "../../const/validations"
import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"
import configure from "items-service"

import {run} from 'express-blueforest'
const router = require("express-blueforest").Router()

const deleteBranch = configure(() => col(cols.BRANCH)).deleteOne

module.exports = router

router.delete('/api/branch/:_id',
    validPathId,
    run(deleteBranch)
)