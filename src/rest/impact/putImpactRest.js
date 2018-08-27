import {validBodyBqt, validBodyId, validBodyImpactId, validBodyTrunkId} from "../validations"
import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {cols} from "../../const/collections"
import {col} from "mongo-registry"
import configure from "items-service"

const router = Router()
const impactService = configure(() => col(cols.IMPACT))

module.exports = router

router.put('/api/tree/impact',
    validBodyId,
    validBodyTrunkId,
    validBodyImpactId,
    validBodyBqt,
    run(({_id, trunkId, facetId, bqt}) => ({filter: {_id, trunkId, facetId}, item: {bqt}})),
    run(impactService.filteredUpdate)
)