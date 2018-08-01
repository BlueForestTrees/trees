import {validId} from "../../const/validations"
import {remove} from "../../service/trunk/deleteTrunkService"

import {run} from 'express-json-api'
import {Router} from "express-json-api"
const router = Router()

module.exports = router

router.delete('/api/trunk/:_id',
    validId,
    run(({_id})=>remove(_id))
)