import {validPathId, validPathBqt} from "../../const/validations"
import {getImpactTank} from "../../topService/getImpactTankTopService"

import {run} from 'express-blueforest'
import {Router} from "express-blueforest"; const router = Router()

module.exports = router

router.get('/api/impacttank/:bqt/:g/:_id',
    validPathId,
    validPathBqt,
    run(({bqt, g, _id}) => getImpactTank(bqt, g, _id))
)