import {ROOT_QT, TRUNK_BQT} from "../../const/paths"
import {validRootId, validTrunkId, present, rootIdIsNotTrunkId, validBodyNumber, validRelativeTo, validUnit} from "../../const/validations"
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
    present(ROOT_QT, TRUNK_BQT),
    validBodyNumber(ROOT_QT),
    validBodyNumber(TRUNK_BQT),
    run(cleanUpsert)
)