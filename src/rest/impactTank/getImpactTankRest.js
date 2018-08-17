import {validPathId, validPathTrunkId} from "../../const/validations"
import {col} from "mongo-registry/dist"
import configure from "items-service"
import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {cols} from "../../const/collections"
import {treeToList, mergeList, mergeListBy} from "../../util/calculations"
import {map} from 'unit-manip'

const router = Router()

module.exports = router

const readRootTree = configure(() => col(cols.ROOT)).treeRead(cols.ROOT, "rootId")
const readAllQuantifiedImpacts = configure(() => col(cols.IMPACT)).readAllQuantified

router.get('/api/impacttank/:trunkId',
    validPathTrunkId,
    run(readRootTree, "READ TREE"),
    run(treeToList, "TREE TO LIST"),
    run(mergeList, "MERGED LIST"),
    run(readAllQuantifiedImpacts, "READ IMPACTS"),
    run(mergeListBy("impactId"), "MERGE ITEMS"),
    run(impacts => map(impacts, impact => ({_id: impact.impactId, bqt: impact.bqt})))
)