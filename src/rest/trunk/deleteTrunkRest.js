import {validId} from "../../const/validations"
import {remove} from "../../service/trunk/deleteTrunkService"

import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
const router = Router()

module.exports = router

router.delete('/api/trunk/:_id',
    validId,
    run(({_id})=>remove(_id))
)