import {run} from 'trees-express'
import ENV from "../../env"

import {Router} from "trees-express"; const router = Router()
module.exports = router

router.get('/api/version', run(() => ({version: ENV.VERSION})))