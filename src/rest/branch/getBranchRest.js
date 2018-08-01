import {validId, validQt, validUnit} from "../../const/validations"
import {QT, UNIT} from "../../const/paths"

import {Router, run} from 'express-blueforest'
import {loadNamedQuantifiedBranch, loadNamedUnquantifiedBranch, readBranchTree} from "../../service/branch/branchService"
import {appendTrunkInfos} from "../../service/trunk/getTrunkService"

const router = Router()

module.exports = router

router.get('/api/branch/:_id',
    validId,
    run(({_id}) => loadNamedUnquantifiedBranch(_id)),
    run(appendTrunkInfos)
)

router.get('/api/branch/:qt/:unit/:_id',
    validId,
    validQt(QT),
    validUnit(UNIT),
    run(({qt, unit, _id}) => loadNamedQuantifiedBranch(qt, unit, _id)),
    run(appendTrunkInfos)
)

router.get('/api/branch/tree/:qt/:unit/:_id',
    validId,
    validQt(QT),
    validUnit(UNIT),
    run(({qt, unit, _id}) => readBranchTree(qt, unit, _id))
)