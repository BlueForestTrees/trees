import {purgeFacetsEntries} from "../../service/facetEntry/deleteFacetEntriesService"

import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
const router = Router()

module.exports = router

router.delete('/api/tree/facetEntry', run(purgeFacetsEntries))


