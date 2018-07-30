import {purgeFacetsEntries} from "../../service/facetEntry/deleteFacetEntriesService"

import {run} from 'trees-express'
import {Router} from "trees-express"
const router = Router()

module.exports = router

router.delete('/api/facetEntry', run(purgeFacetsEntries))


