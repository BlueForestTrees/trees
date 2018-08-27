import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {cols} from "../../const/collections"
import {col} from "mongo-registry"
import configure from "items-service"
import {validBodyBqt, validBodyId, validBodyImpactId, validBodyTrunkId} from "../validations"
import {map, filter} from 'lodash'
import {createObjectId} from "mongo-registry"

const router = Router()
const impactService = configure(() => col(cols.IMPACT))

module.exports = router

router.post('/api/tree/impact',
    validBodyId,
    validBodyTrunkId,
    validBodyImpactId,
    validBodyBqt,
    run(impactService.insertOne)
)