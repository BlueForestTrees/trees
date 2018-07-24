import {addFacetEntry, replaceAllFacetEntries} from "../../service/facetEntry/postFacetEntryService";
import {validColor, validGrandeur, validId, validName} from "../../const/validations";

import {run} from '../../util/run'

import express from 'express';

const router = express.Router();

module.exports = router;

router.post('/api/facetEntry',
    validId,
    validName,
    validGrandeur,
    validColor,
    run(addFacetEntry)
);