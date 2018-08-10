import {addFacetEntry} from "../../service/facetEntry/postFacetEntryService"
import {validColor, validBodyG, validId, validName} from "../../const/validations"

import {run} from 'express-blueforest'

import {Router} from "express-blueforest"

const router = Router()

module.exports = router

router.post('/api/facetEntry',
    validId,
    validName,
    validBodyG,
    validColor,
    run(addFacetEntry)
)