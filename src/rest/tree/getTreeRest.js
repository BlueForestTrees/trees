import {validPathRootId, validPathTrunkId} from "../../validations"
import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
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

//liste des _id de tous les ancêtres
router.get('/api/tree/branches/:rootId',
    validPathRootId,
    run(({rootId}) => col(cols.ROOT)
        .aggregate([
            {$match: {rootId}},
            {$limit: 1},
            {
                $graphLookup: {
                    from: cols.ROOT,
                    startWith: '$rootId',
                    connectFromField: 'trunkId',
                    connectToField: 'rootId',
                    maxDepth: 10,
                    as: "nav"
                }
            },
            {$unwind: "$nav"},
            {$replaceRoot: {newRoot: "$nav"}},
            {$project: {trunkId: 1, _id: 0}}
        ]).toArray()),
    run(parents => parents.map(t => t.trunkId))
)