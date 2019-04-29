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

const loadBranchesTree = configure(() => col(cols.ROOT)).treeRead(cols.ROOT, "rootId", "trunkId")


router.get('/api/tree/nodes/:trunkId',
    validPathTrunkId,
    run(loadTree, "TREE"),
    run(treeToList, "TREE TO LIST"),
    run(mergeList, "MERGED LIST"),
)

//liste bqt/trunkId de toutes les branches, root inclue
router.get('/api/tree/branches/:rootId',
    validPathRootId,
    run(({rootId}) =>
        col(cols.ROOT)
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
                {$project: {rootId: 1, trunkId: 1, _id: 0, bqt: 1}}
            ])
            .toArray()
            .then(branches => {
                let currents = [{bqt: 1, trunkId: rootId}]
                for (let i = 0; i < currents.length; i++) {
                    const current = currents[i]
                    currents = currents.concat(
                        branches
                            .filter(branch => current.trunkId.equals(branch.rootId))
                            .map(({bqt, trunkId}) => ({bqt: current.bqt / bqt, trunkId}))
                    )
                }
                return currents
            })
    ),
)