import {create} from "../../service/trunk/postTrunkService"

import {run} from 'trees-express'
import {validColor, validId, validName, optionalValidType} from "../../const/validations"

import {Router} from "trees-express"; const router = Router()

module.exports = router

router.post('/api/trunk',
    validId,
    validColor,
    validName,
    optionalValidType,
    run(create)
)