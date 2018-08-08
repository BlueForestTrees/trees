import {validateParamsItem} from "../../const/validations"
import {getTank} from "../../topService/getTankTopService"

import {run} from 'express-blueforest'
import {Router} from "express-blueforest"; const router = Router()

module.exports = router

router.get('/api/tank/:bqt/:g/:_id',
    validateParamsItem,
    run(({bqt, g, _id}) => getTank(bqt, g, _id))
)