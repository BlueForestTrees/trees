import {addFacetEntry} from "../../service/facetEntry/postFacetEntryService"
import {validBodyColor, validBodyG, validBodyName, validBodyId} from "../../const/validations"
import {Router, run} from 'express-blueforest'
import {col} from "mongo-registry/dist"
import configure from "items-service"
import {cols} from "../../const/collections"

const router = Router()

module.exports = router

const insertFacet = configure(() => col(cols.FACET_ENTRY)).insertOne

router.post('/api/facetEntry',
    validBodyId,
    validBodyName,
    validBodyG,
    validBodyColor,
    run(insertFacet)
)