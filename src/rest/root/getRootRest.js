import {validPathId} from "../../const/validations"
import {Router, run} from 'express-blueforest'
import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"
import configure from "items-service"

const router = Router()

module.exports = router

const rootService = configure(() => col(cols.ROOT))
const trunkService = configure(() => col(cols.TRUNK))

router.get('/api/root/:_id',
    validPathId,
    run(rootService.get),
    run(trunkService.appendItemsInfos({name: 1, color: 1}))
)

router.get('/api/root/tree/:_id',
    validPathId,
    run(rootService.initReadTree(cols.ROOT))
)