import {purgeImpactsEntries} from "../../service/impactEntry/deleteImpactEntriesService"

import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
const router = Router()

module.exports = router

router.delete('/api/impactEntry', run(purgeImpactsEntries))


