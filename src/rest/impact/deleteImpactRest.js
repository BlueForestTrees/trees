import {cols} from "../../const/collections"
import {col} from "mongo-registry"
import configure from "items-service"

import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {validPathId} from "../validations"
const router = Router()

const deleteImpact = configure(() => col(cols.IMPACT)).deleteOne
module.exports = router

router.delete('/api/impact/:_id',
    validPathId,
    run(deleteImpact)
)