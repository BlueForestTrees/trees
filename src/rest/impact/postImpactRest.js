import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {cols} from "../../collections"
import {col} from "mongo-registry"
import configure from "items-service"
import {
    setUserIdIn,
    validBodyBqt,
    validBodyId,
    validBodyImpactId,
    validBodyTrunkId,
    validOwner,
    validUser
} from "../../validations"
import {map, filter} from 'lodash'
import {createObjectId} from "mongo-registry"

const router = Router()
const trunks = col(cols.TRUNK)
const impactService = configure(() => col(cols.IMPACT))

module.exports = router

router.post('/api/tree/impact',
    validBodyId,
    validBodyTrunkId,
    validBodyImpactId,
    validBodyBqt,
    validUser,
    validOwner(trunks, "trunkId"),
    run(setUserIdIn("oid")),
    run(impactService.insertOne)
)