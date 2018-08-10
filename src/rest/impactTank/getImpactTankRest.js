import {validPathId} from "../../const/validations"
import {col} from "mongo-registry/dist"
import configure from "items-service"
import {run} from 'express-blueforest'
import {Router} from "express-blueforest";
import {cols} from "../../const/collections"
import {treeToList, mergeList, mergeItemList} from "../../util/calculations"

const router = Router()

module.exports = router

const readRootTree = configure(() => col(cols.ROOT)).initReadTree(cols.ROOT)
const readAllQuantifiedImpacts = configure(() => col(cols.IMPACT)).readAllQuantified

router.get('/api/impacttank/:_id',
    validPathId,
    run(readRootTree),
    run(treeToList),
    run(mergeList),
    run(readAllQuantifiedImpacts),
    run(mergeItemList),
    run(mergeList)
)