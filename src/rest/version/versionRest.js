import {run} from 'express-blueforest'
import ENV from "../../env"

import {Router} from "express-blueforest"; const router = Router()
module.exports = router

router.get('/api/version', run(() => ({version: ENV.VERSION})))