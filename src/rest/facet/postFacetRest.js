import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {
    validBodyBqt,
    validBodyId,
    validBodyFacetId,
    validBodyTrunkId,
    validUser,
    validOwner,
    setUserIdIn
} from "../validations"
import {cols} from "../../const/collections"
import {col} from "mongo-registry"
import configure from "items-service"

const router = Router()
const trunks = col(cols.TRUNK)
const facetService = configure(() => col(cols.FACET))

module.exports = router

router.post('/api/tree/facet',
    validBodyId,
    validBodyTrunkId,
    validBodyFacetId,
    validBodyBqt,
    validUser,
    validOwner(trunks, "trunkId"),
    run(setUserIdIn("oid")),
    run(facetService.insertOne)
)