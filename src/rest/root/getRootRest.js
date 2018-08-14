import {validId, validPathId, validPathTrunkId, validTrunkId} from "../../const/validations"
import {Router, run} from 'express-blueforest'
import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"
import configure from "items-service"

const router = Router()

module.exports = router

const rootService = configure(() => col(cols.ROOT))
const readRootTree = rootService.treeRead(cols.ROOT, "rootId")
const trunkService = configure(() => col(cols.TRUNK))

router.get('/api/root/:trunkId',
    validPathTrunkId,
    run(rootService.find({trunkId: 0})),
    run(trunkService.append(
        "rootId",
        {name: 1, color: 1, 'quantity.g': 1},
        (root, rootTrunk) => {
            root.name = rootTrunk.name
            root.color = rootTrunk.color
            root.quantity = {bqt: root.bqt, g: rootTrunk.quantity.g}
            delete root.bqt
            return root
        }
    ))
)

router.get('/api/root/tree/:trunkId',
    validTrunkId,
    run(readRootTree)
)