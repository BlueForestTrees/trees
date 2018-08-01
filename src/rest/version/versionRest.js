import {run} from 'express-json-api'
import ENV from "../../env"

import {Router} from "express-json-api"; const router = Router()
module.exports = router

router.get('/api/version', run(() => ({version: ENV.VERSION})))