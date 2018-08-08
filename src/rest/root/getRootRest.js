import {validId, validateParamsItem} from "../../const/validations"

import {Router, run} from 'express-blueforest'
import {loadNamedUnquantifiedRoot} from "../../service/root/rootService"
import {appendTrunkInfos} from "../../service/trunk/getTrunkService"
import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"
import configure from "items-service"

const router = Router()

module.exports = router

const itemService = configure(() => col(cols.ROOT))

router.get('/api/root/:_id',
    validId,
    run(({_id}) => loadNamedUnquantifiedRoot(_id)),
    run(appendTrunkInfos)
)

router.get('/api/root/:bqt/:g/:_id',
    validateParamsItem,
    run(itemService.loadQuantified),
    run(appendTrunkInfos)
)

router.get('/api/root/tree/:bqt/:g/:_id',
    validateParamsItem,
    run(itemService.initReadTree(cols.ROOT))
)