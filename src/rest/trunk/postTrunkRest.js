import {Router, run} from 'express-blueforest'
import {col, object} from "mongo-registry"
import {set, validId, validBodyName, validBodyQuantityBqt, validBodyQuantityG, validUser, setOid} from "../../validations"
import ENV from "../../env"
import {createSender} from "simple-rbmq"

const router = Router()
module.exports = router

router.post('/api/tree/trunk',
    validId,
    validBodyName,
    validBodyQuantityG,
    validBodyQuantityBqt,
    validUser,
    run(setOid),
    run(set("date", () => new Date())),
    run(createSender(ENV.RB.exchange, ENV.RK_TRUNK_UPSERT))
)