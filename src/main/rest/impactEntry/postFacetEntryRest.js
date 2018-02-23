import {runraw} from "../../util/runraw";
import {addFacetEntry, replaceAllFacetEntries} from "../../service/facetEntry/postFacetEntryService";
import {validGrandeur, validName} from "../../const/validations";
import {GRANDEUR} from "../../const/paths";

const run = require('../../util/run');

const express = require('express');
const router = express.Router();

module.exports = router;

router.post('/api/facetEntry',
    [
        validName,
        validGrandeur(GRANDEUR)
    ],
    run(addFacetEntry)
);

router.post('/api/facetEntry/all',
    runraw(replaceAllFacetEntries)
);