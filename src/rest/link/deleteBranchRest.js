import {validOwner, validPathId, validUser} from "../validations"
import {cols} from "../../const/collections"
import {col} from "mongo-registry"
import configure from "items-service"

import {run} from 'express-blueforest'
const router = require("express-blueforest").Router()

const roots = col(cols.ROOT)
const deleteBranch = configure(() => col(cols.ROOT)).deleteOne

module.exports = router

router.delete('/api/tree/branch/:_id',
    validPathId,
    validUser,
    validOwner(roots),
    run(deleteBranch)
)