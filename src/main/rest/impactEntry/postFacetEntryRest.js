import {runraw} from "../../util/runraw";
import {addImpactEntry, replaceAllImpactEntries} from "../../service/impactEntry/postImpactEntryService";
import {validGrandeur, validName} from "../../const/validations";
import {GRANDEUR} from "../../const/paths";

const run = require('../../util/run');

const express = require('express');
const router = express.Router();

module.exports = router;

router.post('/api/impactEntry',
    [
        validName,
        validGrandeur(GRANDEUR)
    ],
    run(addImpactEntry)
);

router.post('/api/impactEntry/all',
    runraw(replaceAllImpactEntries)
);