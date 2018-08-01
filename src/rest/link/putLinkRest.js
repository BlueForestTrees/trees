import {ROOT_QT, ROOT_UNIT, TRUNK_QT, TRUNK_UNIT} from "../../const/paths"
import {validRootId, validTrunkId, present, rootIdIsNotTrunkId, validQt, validRelativeTo, validUnit} from "../../const/validations"
import {upsertLink} from "../../topService/linkTopService"

import {run} from 'express-blueforest'
import {Router} from "express-blueforest"; const router = Router()

module.exports = router

const cleanUpsert = ({trunk, root}) => {
    if (!root.relativeTo) {
        delete root.relativeTo
    }
    return upsertLink({trunk, root})
}

router.put('/api/link',
    validTrunkId,
    validRootId,
    validRelativeTo,
    rootIdIsNotTrunkId,
    present(ROOT_QT, ROOT_UNIT, TRUNK_QT, TRUNK_UNIT),
    validUnit(ROOT_UNIT),
    validUnit(TRUNK_UNIT),
    validQt(ROOT_QT),
    validQt(TRUNK_QT),
    run(cleanUpsert)
)