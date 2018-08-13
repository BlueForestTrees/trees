import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"
import configure from "items-service"

import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {validPathImpactId, validPathTrunkId} from "../../const/validations"
const router = Router()

const deleteImpacts = configure(() => col(cols.IMPACT)).deleteItems
module.exports = router

router.delete('/api/impact/:trunkId',
    validPathTrunkId,
    run(deleteImpacts)
)

router.delete('/api/impact/:trunkId/:impactId',
    validPathTrunkId,
    validPathImpactId,
    run(deleteImpacts)
)
