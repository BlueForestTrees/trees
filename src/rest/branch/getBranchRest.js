import {validPathTrunkId, validTrunkId} from "../validations"
import {Router, run} from 'express-blueforest'
import {cols} from "../../const/collections"
import {col} from "mongo-registry"
import configure from "items-service"

const router = Router()

module.exports = router

const branchService = configure(() => col(cols.BRANCH))
const trunkService = configure(() => col(cols.TRUNK))
const readBranchTree = branchService.treeRead(cols.BRANCH, "trunkId", "branchId")

router.get('/api/branch/:trunkId',
    validPathTrunkId,
    run(branchService.findNoMixin, "GET BRANCHES"),
    run(trunkService.append("branchId", {name: 1, color: 1, 'quantity.g': 1},
        (branch, branchTrunk) => ({
            _id: branch.branchId,
            linkId: branch._id,
            trunk: {
                name: branchTrunk.name,
                color: branchTrunk.color,
                quantity: {bqt: branch.bqt, g: branchTrunk.quantity.g}
            }
        })
    ), "MERGE BRANCH INFOS")
)

router.get('/api/branch/tree/:trunkId',
    validTrunkId,
    run(readBranchTree)
)