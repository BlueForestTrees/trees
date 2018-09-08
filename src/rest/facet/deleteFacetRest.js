import {cols} from "../../const/collections"
import {col} from "mongo-registry"
import configure from "items-service"
import {Router} from "express-blueforest"
import {run} from 'express-blueforest'
import {validOwner, validPathId, validUser} from "../validations"

const router = Router()

const facets = col(cols.FACET)
const deleteFacet = configure(() => facets).deleteOne
module.exports = router

router.delete('/api/tree/facet/:_id',
    validPathId,
    validUser,
    validOwner(facets),
    run(deleteFacet)
)