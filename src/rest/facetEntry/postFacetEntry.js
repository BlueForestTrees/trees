import {runraw} from "../../util/runraw";

const run = require('../../util/run');

const express = require('express');
const router = express.Router();
const {check} = require('express-validator/check');
const facets = require("../../service/facets");
const grandeursKeys = require("../../service/grandeurs").grandeursKeys;

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