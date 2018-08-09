import {validId} from "../../const/validations"
import {Router, run} from 'express-blueforest'
import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"
import configure from "items-service"

const router = Router()

module.exports = router

const facetService = configure(() => col(cols.FACET))
const facetEntryService = configure(() => col(cols.FACET_ENTRY))

router.get('/api/facet/:_id',
    validId,
    run(facetService.get),
    run(facetEntryService.appendItemsInfos({name: 1, color: 1}))
)