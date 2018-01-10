const run = require('../../util/run');
const express = require('express');
const router = express.Router();
const facets = require("../../service/facets");

module.exports = router;

router.delete('/api/facetEntries', run(facets.purge));


