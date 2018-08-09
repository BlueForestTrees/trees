import {col} from "mongo-registry/dist"
import {ROOT_QT, TRUNK_BQT} from "../../const/paths"
import {validRootId, validTrunkId, present, rootIdIsNotTrunkId, validRelativeTo} from "../../const/validations"

import configure from "items-service"
import {cols} from "../../const/collections"

import {run} from 'express-blueforest'
import {Router} from "express-blueforest"; const router = Router()

const upsertRoot = configure(() => col(cols.ROOT)).upsertItem

module.exports = router

router.put('/api/root',
    validTrunkId,
    validRootId,
    validRelativeTo,
    rootIdIsNotTrunkId,
    present(ROOT_QT, TRUNK_BQT),
    run(({trunk, root}) => cleanUpsert(trunk, root))
)

const cleanUpsert = (trunk, root) => {
    if (!root.relativeTo) {
        delete root.relativeTo
    }
    return upsertRoot(trunk, root)
}