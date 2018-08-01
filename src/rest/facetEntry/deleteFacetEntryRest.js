import {purgeFacetsEntries} from "../../service/facetEntry/deleteFacetEntriesService"

import {run} from 'express-json-api'
import {Router} from "express-json-api"
const router = Router()

module.exports = router

router.delete('/api/facetEntry', run(purgeFacetsEntries))


