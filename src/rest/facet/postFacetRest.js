import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {facetIdIsNotTrunkId, validFacetId, validItem, validTrunkId} from "../../const/validations"
import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"
import configure from "items-service"

const router = Router()
const insertFacet = configure(() => col(cols.FACET)).upsertItem

module.exports = router

router.post('/api/facet',
    validItem("trunk"),
    validItem("facet"),
    facetIdIsNotTrunkId,
    run(({trunk, facet}) => insertFacet(trunk, facet))
)