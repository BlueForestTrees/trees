import {validPathBqt, validPathG, validPathId} from "../../const/validations"
import {Router, run} from 'express-blueforest'
import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"
import configure from "items-service"

const router = Router()

module.exports = router

const branchService = configure(() => col(cols.BRANCH))
const trunkService = configure(() => col(cols.TRUNK))

router.get('/api/branch/:_id',
    validPathId,
    run(branchService.get),
    run(trunkService.appendItemsInfos({name: 1, color: 1}))
)

router.get('/api/branch/tree/:bqt/:g/:_id',
    validPathId,
    validPathBqt,
    validPathG,
    run(branchService.initReadTree(cols.BRANCH))
)