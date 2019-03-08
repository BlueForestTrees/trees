import {validId, validOwner, validUser} from "../../validations"
import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {cols} from "../../collections"
import {col} from "mongo-registry"
import {createSender} from "simple-rbmq"
import ENV from "../../env"

const router = Router()

module.exports = router

router.delete('/api/tree/trunk/:_id',
    validId,
    validUser,
    validOwner(col(cols.TRUNK)),
    run(createSender(ENV.RB.exchange, ENV.RK_TRUNK_DELETE))
)