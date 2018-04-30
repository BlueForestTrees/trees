import {runraw} from "../../util/runraw";
import {addFacetEntry, replaceAllFacetEntries} from "../../service/facetEntry/postFacetEntryService";
import {validGrandeur, validName} from "../../const/validations";
import {GRANDEUR} from "../../const/paths";

import {run} from '../../util/run'

import express from 'express';
const router = express.Router();

module.exports = router;

router.post('/api/facetEntry',
    [
        validName,
        validGrandeur
    ],
    run(addFacetEntry)
);

router.post('/api/facetEntry/all',
    runraw(replaceAllFacetEntries)
);