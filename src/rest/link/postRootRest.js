import {createSender} from "simple-rbmq"
import {Router, run} from "express-blueforest"
import {
    rootIdIsNotTrunkId,
    validBodyBqt,
    validBodyOptRelativeTo,
    validBodyId,
    validBodyTrunkId,
    validBodyRootId,
    validUser, validOwner, setOid, RELATIVE_TO
} from "../../validations"
import {cols} from "../../collections"
import {col, object} from "mongo-registry"
import {cleanFalsy} from "../../util/calculations"
import ENV from "../../env"

const router = Router()
module.exports = router

const trunks = col(cols.TRUNK)

module.exports = router

router.post('/api/tree/root',
    validBodyId,
    validBodyTrunkId,
    validBodyRootId,
    validBodyOptRelativeTo,
    validBodyBqt,
    rootIdIsNotTrunkId,
    validUser,
    validOwner(trunks, "trunkId"),

    run(setOid),
    run(cleanFalsy(RELATIVE_TO)),
    run(createSender(ENV.RB.exchange, ENV.RK_ROOT_UPSERT))
)