import {getAllFacetEntries, getFacetEntryByName} from "../../service/facetEntry/getFacetEntryService"
import {run} from 'express-blueforest'
import {Router} from "express-blueforest";
import {optionalValidG, optionnalAfterIdx, optionnalPageSize, optionalValidQ} from "../validations"
import {cols} from "../../const/collections"
import configure from "items-service"
import {col} from "mongo-registry"
import regexEscape from "regex-escape"

const router = Router()
module.exports = router

const facetEntryService = configure(() => col(cols.FACET_ENTRY))
const searchMixin = {color: 1, name: 1, g: 1}

router.get('/api/tree/facetEntry',
    optionalValidQ,
    optionalValidG,
    optionnalPageSize,
    optionnalAfterIdx,
    run(({q, g, aidx, ps}) => facetEntryService.search(
        {
            name:{$regex: `^.*${regexEscape(q)}.*`},
            "quantity.g":g,
            _id:{$gt:aidx}
        },
        ps, searchMixin))
)

router.get('/api/tree/facetEntry/all',
    run(getAllFacetEntries)
)

router.get('/api/tree/facetEntry/:name',
    run(({name}) => getFacetEntryByName(name))
)