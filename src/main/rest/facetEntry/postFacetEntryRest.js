import {runraw} from "../../util/runraw";

const run = require('../../util/run');

const express = require('express');
const router = express.Router();
const {check} = require('express-validator/check');
const facets = require("../../service/facetEntryService");
const grandeursKeys = require("../../service/grandeursService").grandeursKeys;

module.exports = router;

router.post('/api/facetEntry',
    [
        check('name').isLength({min:2}),
        check('grandeur').isIn(grandeursKeys)
    ],
    run(facets.add)
);

router.post('/api/facetEntries',
    runraw(facets.putall)
);