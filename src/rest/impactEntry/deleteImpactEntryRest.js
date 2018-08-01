import {purgeImpactsEntries} from "../../service/impactEntry/deleteImpactEntriesService"

import {run} from 'express-json-api'
import {Router} from "express-json-api"
const router = Router()

module.exports = router

router.delete('/api/impactEntry', run(purgeImpactsEntries))


