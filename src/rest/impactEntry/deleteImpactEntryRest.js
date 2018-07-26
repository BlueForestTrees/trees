import {purgeImpactsEntries} from "../../service/impactEntry/deleteImpactEntriesService";

import {run} from '../../util/run'
import {Router} from "trees-express";
const router = Router();

module.exports = router;

router.delete('/api/impactEntry', run(purgeImpactsEntries));


