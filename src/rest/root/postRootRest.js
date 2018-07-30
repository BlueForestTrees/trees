import {run} from 'trees-express'
import {Router} from "trees-express"
import {validRootId, validTrunkId, rootIdIsNotTrunkId} from "../../const/validations"
import {cols} from "../../const/collections"
import {col} from "trees-db-version/dist"
import configure from "trees-items-service"

const router = Router()
const insertRoot = configure(() => col(cols.ROOT)).insertItem

module.exports = router

router.post('/api/root',
    validTrunkId,
    validRootId,
    rootIdIsNotTrunkId,
    run(({trunk, root}) => insertRoot(trunk, root))
)