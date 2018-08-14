import {validPathTrunkId, validTrunkId} from "../../const/validations"
import {Router, run} from 'express-blueforest'
import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"
import configure from "items-service"

const router = Router()

module.exports = router

const branchService = configure(() => col(cols.BRANCH))
const trunkService = configure(() => col(cols.TRUNK))
const readBranchTree = branchService.treeRead(cols.BRANCH, "branchId")

router.get('/api/branch/:trunkId',
    validPathTrunkId,
    run(branchService.find({trunkId: 0})),
    run(trunkService.append(
        "branchId",
        {name: 1, color: 1, 'quantity.g': 1},
        (branch, branchTrunk) => {
            branch.name = branchTrunk.name
            branch.color = branchTrunk.color
            branch.quantity = {bqt: branch.bqt, g: branchTrunk.quantity.g}
            delete branch.bqt
            return branch
        }
    ))
)

router.get('/api/branch/tree/:trunkId',
    validTrunkId,
    run(readBranchTree)
)