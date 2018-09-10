import {validBodyColor, validBodyG, validId, validBodyName} from "../../validations"
import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {cols} from "../../collections"
import {col} from "mongo-registry"
import configure from "items-service"

const insertImpactEntry = configure(() => col(cols.IMPACT_ENTRY)).insertOne

const router = Router()

module.exports = router

router.post('/api/tree/impactEntry',
    validId,
    validBodyName,
    validBodyG,
    validBodyColor,
    run(insertImpactEntry)
)