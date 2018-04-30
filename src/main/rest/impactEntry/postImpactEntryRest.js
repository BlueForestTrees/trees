import {runraw} from "../../util/runraw";
import {addImpactEntry, replaceAllImpactEntries} from "../../service/impactEntry/postImpactEntryService";
import {validGrandeur, validName} from "../../const/validations";
import {GRANDEUR} from "../../const/paths";

import {run} from '../../util/run'

import express from 'express';
const router = express.Router();

module.exports = router;

router.post('/api/impactEntry',
    [
        validName,
        validGrandeur
    ],
    run(addImpactEntry)
);

router.post('/api/impactEntry/all',
    runraw(replaceAllImpactEntries)
);