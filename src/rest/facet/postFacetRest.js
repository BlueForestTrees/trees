import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {validBodyBqt, validBodyId, validBodyFacetId, validBodyTrunkId} from "../../const/validations"
import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"
import configure from "items-service"

const router = Router()
const facetService = configure(() => col(cols.FACET))

module.exports = router

router.post('/api/facet',
    validBodyId,
    validBodyTrunkId,
    validBodyFacetId,
    validBodyBqt,
    run(facetService.insertOne)
)