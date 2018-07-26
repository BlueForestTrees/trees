import {addImpactEntry} from "../../service/impactEntry/postImpactEntryService";
import {validColor, validGrandeur, validName} from "../../const/validations";

import {run} from '../../util/run'

import express from "trees-express";
const router = express.Router();

module.exports = router;

router.post('/api/impactEntry',
    validName,
    validGrandeur,
    validColor,
    run(addImpactEntry)
);