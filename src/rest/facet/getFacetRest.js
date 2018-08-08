import {validId, validateParamsItem} from "../../const/validations"

import {run} from 'express-blueforest'
import {loadFacet} from "../../service/facet/getFacetService"
import {Router} from "express-blueforest"
import {appendFacetInfos} from "../../service/facetEntry/getFacetEntryService"
import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"
import configure from "items-service"

const router = Router()

module.exports = router

const itemService = configure(() => col(cols.FACET))

router.get('/api/facet/:_id',
    validId,
    run(({_id}) => loadFacet(_id)),
    run(appendFacetInfos)
)

router.get('/api/facet/:bqt/:g/:_id',
    validateParamsItem,
    run(itemService.loadQuantified),
    run(appendFacetInfos)
)