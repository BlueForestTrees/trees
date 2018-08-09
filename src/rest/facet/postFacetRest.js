import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {facetIdIsNotTrunkId, validItem} from "../../const/validations"
import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"
import configure from "items-service"

const router = Router()
const itemsService = configure(() => col(cols.FACET))

module.exports = router

router.post('/api/facet',
    validItem("trunk"),
    validItem("facet"),
    facetIdIsNotTrunkId,
    run(({trunk, facet}) => itemsService.upsertItem(trunk, facet))
)