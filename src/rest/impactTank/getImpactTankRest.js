import {validId, validQt, validUnit} from "../../const/validations"
import {QT, UNIT} from "../../const/paths"
import {getImpactTank} from "../../topService/getImpactTankTopService"

import {run} from 'express-json-api'
import {Router} from "express-json-api"; const router = Router()

module.exports = router

router.get('/api/impacttank/:qt/:unit/:_id',
    validId,
    validQt(QT),
    validUnit(UNIT),
    run(({qt, unit, _id}) => getImpactTank(qt, unit, _id))
)