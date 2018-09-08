import {validBodyBqt, validBodyId, validBodyImpactId, validBodyTrunkId, validOwner, validUser} from "../validations"
import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {cols} from "../../const/collections"
import {col} from "mongo-registry"
import configure from "items-service"

const router = Router()
const impacts = col(cols.IMPACT)
const impactService = configure(() => impacts)

module.exports = router

router.put('/api/tree/impact',
    validBodyId,
    validBodyTrunkId,
    validBodyImpactId,
    validBodyBqt,
    validUser,
    validOwner(impacts),
    run(({_id, trunkId, facetId, bqt}) => ({filter: {_id, trunkId, facetId}, item: {bqt}})),
    run(impactService.filteredUpdate)
)