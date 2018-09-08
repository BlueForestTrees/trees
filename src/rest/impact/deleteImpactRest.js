import {cols} from "../../const/collections"
import {col} from "mongo-registry"
import configure from "items-service"

import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {validOwner, validPathId, validUser} from "../validations"
const router = Router()

const impacts = col(cols.IMPACT)
const deleteImpact = configure(() => impacts).deleteOne
module.exports = router

router.delete('/api/tree/impact/:_id',
    validPathId,
    validUser,
    validOwner(impacts),
    run(deleteImpact)
)