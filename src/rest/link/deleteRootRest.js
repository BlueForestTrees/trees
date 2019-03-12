import {validOwner, validPathId, validUser} from "../../validations"
import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {cols} from "../../collections"
import {col} from "mongo-registry"
import {createSender} from "simple-rbmq"
import ENV from "../../env"

const router = Router()

router.delete('/api/tree/root/:_id',
    validPathId,
    validUser,
    validOwner(col(cols.ROOT)),
    run(createSender(ENV.RB.exchange, ENV.RK_ROOT_DELETE)),
)

module.exports = router
