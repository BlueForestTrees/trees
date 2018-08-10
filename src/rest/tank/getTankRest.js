import {validPathId} from "../../const/validations"
import {run} from 'express-blueforest'
import {Router} from "express-blueforest";
import {omit} from 'lodash'
import {mergeList, extraireFeuilles} from "../../util/calculations"
import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"
import configure from "items-service"

const router = Router()
module.exports = router
const readRootTree = configure(() => col(cols.ROOT)).initReadTree(cols.ROOT)

router.get('/api/tank/:_id',
    validPathId,
    run(readRootTree),
    run(extraireFeuilles),
    run(mergeList)
)