import {getGrandeurs} from "unit-manip"

import {Router} from "express-blueforest"
const router = Router()
import {run} from 'express-blueforest'

router.get('/api/grandeurs',
    run(getGrandeurs)
)

module.exports = router