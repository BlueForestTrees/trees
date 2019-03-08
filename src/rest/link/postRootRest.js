import {Router, run} from "express-blueforest"
import {
    rootIdIsNotTrunkId,
    validBodyBqt,
    validBodyOptRelativeTo,
    validBodyId,
    validBodyTrunkId,
    validBodyRootId,
    validUser, validOwner, setOid
} from "../../validations"
import {cols} from "../../collections"
import {col, object} from "mongo-registry"
import {cleanNull} from "../../util/calculations"

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
    run(cleanNull("relativeTo")),
    run(root => col(cols.ROOT).insertOne(root)),
    run(({result}) => result)
)