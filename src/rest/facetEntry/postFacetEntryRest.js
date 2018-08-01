import {addFacetEntry, replaceAllFacetEntries} from "../../service/facetEntry/postFacetEntryService"
import {validColor, validGrandeur, validId, validName} from "../../const/validations"

import {run} from 'express-json-api'

import {Router} from "express-json-api"

const router = Router()

module.exports = router

router.post('/api/facetEntry',
    validId,
    validName,
    validGrandeur,
    validColor,
    run(addFacetEntry)
)