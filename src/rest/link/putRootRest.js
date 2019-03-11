import {createSender} from "simple-rbmq"
import {col} from "mongo-registry"
import {
    validId,
    validBodyBqt,
    validOwner,
    validUser, validBodyOptRelativeTo, RELATIVE_TO
} from "../../validations"
import {map} from "lodash"
import {cols} from "../../collections"

import {run, Router} from 'express-blueforest'
import ENV from "../../env"
import {cleanNull} from "../../util/calculations"

const router = Router()
const roots = col(cols.ROOT)

router.put('/api/tree/root',
    validId,
    validBodyBqt,
    validUser,
    validBodyOptRelativeTo,
    validOwner(roots),
    run(cleanNull(RELATIVE_TO)),
    run(createSender(ENV.RB.exchange, ENV.RK_ROOT_UPSERT))
)

module.exports = router
