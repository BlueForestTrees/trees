import {purgeFacetsEntries} from "../../service/facetEntry/deleteFacetEntriesService";

import {run} from '../../util/run'
import {Router} from "express";
const router = Router();

module.exports = router;

router.delete('/api/facetEntry', run(purgeFacetsEntries));


