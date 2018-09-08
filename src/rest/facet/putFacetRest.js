import {validBodyBqt, validBodyFacetId, validBodyId, validBodyTrunkId, validOwner, validUser} from "../validations"
import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {cols} from "../../const/collections"
import {col} from "mongo-registry"
import configure from "items-service"

const router = Router()
const facets = col(cols.FACET)
const facetService = configure(() => facets)

module.exports = router

router.put('/api/tree/facet',
    validBodyId,
    validBodyTrunkId,
    validBodyFacetId,
    validBodyBqt,
    validUser,
    validOwner(facets),
    run(({_id, trunkId, facetId, bqt}) => ({filter: {_id, trunkId, facetId}, item: {bqt}})),
    run(facetService.filteredUpdate)
)