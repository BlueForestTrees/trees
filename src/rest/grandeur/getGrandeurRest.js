import {getGrandeurs} from "units-manip"

import {Router} from "express-json-api"
const router = Router()
import {run} from 'express-json-api'

router.get('/api/grandeurs',
    run(getGrandeurs)
)

module.exports = router