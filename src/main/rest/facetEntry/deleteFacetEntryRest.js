import {purgeFacetsEntries} from "../../service/facetEntry/deleteFacetEntriesService";

import {run} from '../../util/run'
import express from 'express';
const router = express.Router();

module.exports = router;

router.delete('/api/facetEntry', run(purgeFacetsEntries));


