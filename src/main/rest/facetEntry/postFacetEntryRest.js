import {runraw} from "../../util/runraw";
import {grandeursKeys} from "../../service/grandeur/grandeursService";
import {addFacetEntry, replaceAllFacetEntries} from "../../service/facetEntry/postFacetEntryService";

const run = require('../../util/run');

const express = require('express');
const router = express.Router();
const {check} = require('express-validator/check');

module.exports = router;

router.post('/api/facetEntry',
    [
        check('name').isLength({min:2}),
        check('grandeur').isIn(grandeursKeys)
    ],
    run(addFacetEntry)
);

router.post('/api/facetEntry/all',
    runraw(replaceAllFacetEntries)
);