import {validBodyBqt, validBodyFacetId, validBodyId, validBodyTrunkId} from "../validations"
import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"
import configure from "items-service"

const router = Router()
const facetService = configure(() => col(cols.FACET))

module.exports = router

router.put('/api/facet',
    validBodyId,
    validBodyTrunkId,
    validBodyFacetId,
    validBodyBqt,
    run(({_id, trunkId, facetId, bqt}) => ({filter: {_id, trunkId, facetId}, item: {bqt}})),
    run(facetService.filteredUpdate)
)