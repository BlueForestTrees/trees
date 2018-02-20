import {purgeFacetsEntries} from "../../service/facetEntry/deleteFacetEntriesService";

const run = require('../../util/run');
const express = require('express');
const router = express.Router();

module.exports = router;

router.delete('/api/facetEntry', run(purgeFacetsEntries));


