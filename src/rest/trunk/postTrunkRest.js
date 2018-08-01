import {create} from "../../service/trunk/postTrunkService"

import {run} from 'express-blueforest'
import {validColor, validId, validName, optionalValidType} from "../../const/validations"

import {Router} from "express-blueforest"; const router = Router()

module.exports = router

router.post('/api/trunk',
    validId,
    validColor,
    validName,
    optionalValidType,
    run(create)
)