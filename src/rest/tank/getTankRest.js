import {validPathTrunkId} from "../validations"
import {run} from 'express-blueforest'
import {Router} from "express-blueforest";
import {omit} from 'lodash'
import {mergeList, extraireFeuilles} from "../../util/calculations"
import {cols} from "../../const/collections"
import {col} from "mongo-registry"
import configure from "items-service"

const router = Router()
module.exports = router
const readRootTree = configure(() => col(cols.ROOT)).treeRead(cols.ROOT, "rootId")

router.get('/api/tank/:trunkId',
    validPathTrunkId,
    run(readRootTree, "TREE"),
    run(extraireFeuilles, "TANK"),
    run(mergeList)
)