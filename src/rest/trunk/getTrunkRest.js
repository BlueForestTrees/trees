import {validId, validIds, validQ, validQt, validT, validUnit} from "../../const/validations"
import {getQuantifiedTrunk, getTrunk, getTrunks, search} from "../../service/trunk/getTrunkService"

import {run} from 'express-json-api'
import {QT, UNIT} from "../../const/paths"

import {Router} from "express-json-api"; const router = Router()
const {check} = require('express-validator/check')

module.exports = router

router.get('/api/trunks',
    validQ,
    validT,
    run(({q, t}) => search(q, t))
)

router.get('/api/trunk/:_id',
    validId,
    run(({_id}) => getTrunk(_id))
)

router.get('/api/trunk',
    validIds,
    run(({_ids}) => getTrunks(_ids))
)

router.get('/api/trunk/:qt/:unit/:_id',
    validId,
    validQt(QT),
    validUnit(UNIT),
    run(({qt, unit, _id}) => getQuantifiedTrunk(qt, unit, _id))
)