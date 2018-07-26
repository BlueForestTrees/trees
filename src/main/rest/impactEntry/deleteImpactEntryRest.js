import {purgeImpactsEntries} from "../../service/impactEntry/deleteImpactEntriesService";

import {run} from '../../util/run'
import express from "trees-express";
const router = express.Router();

module.exports = router;

router.delete('/api/impactEntry', run(purgeImpactsEntries));


