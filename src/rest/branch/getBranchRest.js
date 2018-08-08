import {validId, validateParamsItem} from "../../const/validations"
import {Router, run, convert} from 'express-blueforest'
import {loadNamedUnquantifiedBranch} from "../../service/branch/branchService"
import {appendTrunkInfos} from "../../service/trunk/getTrunkService"
import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"
import configure from "items-service"

const router = Router()

module.exports = router

const itemService = configure(() => col(cols.BRANCH))

router.get('/api/branch/:_id',
    validId,
    run(({_id}) => loadNamedUnquantifiedBranch(_id)),
    run(appendTrunkInfos)
)

router.get('/api/branch/:bqt/:g/:_id',
    validateParamsItem,
    run(itemService.loadQuantified),
    run(appendTrunkInfos)
)

router.get('/api/branch/tree/:bqt/:g/:_id',
    validateParamsItem,
    run(itemService.initReadTree(cols.BRANCH))
)