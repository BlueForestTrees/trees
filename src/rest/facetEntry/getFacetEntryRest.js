import {getAllFacetEntries, getFacetEntryByName} from "../../service/facetEntry/getFacetEntryService"
import {run} from 'express-blueforest'
import {Router} from "express-blueforest";
import {optionalValidG, optionnalAfterIdx, optionnalPageSize, optionalValidQ} from "../validations"
import {cols} from "../../const/collections"
import configure from "items-service"
import {col} from "mongo-registry"

const router = Router()
module.exports = router

const facetEntryService = configure(() => col(cols.FACET_ENTRY))
const searchMixin = {color: 1, name: 1, g: 1}

router.get('/api/facetEntry',
    optionalValidQ,
    optionalValidG,
    optionnalPageSize,
    optionnalAfterIdx,
    run(({q, g, aidx, ps}) => facetEntryService.search([
        {key: "name", type: "regex", value: q},
        {key: "quantity.g", value: g},
        {key: "_id", type: "gt", value: aidx}
    ], ps, searchMixin))
)

router.get('/api/facetEntry/all',
    run(getAllFacetEntries)
)

router.get('/api/facetEntry/:name',
    run(({name}) => getFacetEntryByName(name))
)