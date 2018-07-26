import {addFacetEntry, replaceAllFacetEntries} from "../../service/facetEntry/postFacetEntryService";
import {validColor, validGrandeur, validName} from "../../const/validations";

import {run} from '../../util/run'

import express from "trees-express";

const router = express.Router();

module.exports = router;

router.post('/api/facetEntry',
    validName,
    validGrandeur,
    validColor,
    run(addFacetEntry)
);