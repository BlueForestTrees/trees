import {run} from 'express-json-api'
import {Router} from "express-json-api"
import {facetIdIsNotTrunkId, validItem} from "../../const/validations"
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