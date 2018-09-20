import {validPathTrunkId} from "../../validations"
import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {omit} from 'lodash'
import {cols} from "../../collections"
import {col} from "mongo-registry"
import configure from "items-service"
import {mergeList, treeToList} from "../../util/calculations"

const router = Router()
module.exports = router

const loadTree = configure(() => col(cols.ROOT)).treeRead(cols.ROOT, "trunkId", "rootId")

router.get('/api/tree/nodes/:trunkId',
    validPathTrunkId,
    run(loadTree, "TREE"),
    run(treeToList, "TREE TO LIST"),
    run(mergeList, "MERGED LIST"),
)