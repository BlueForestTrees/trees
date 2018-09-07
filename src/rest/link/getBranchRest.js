import {validPathRootId} from "../validations"
import {Router, run} from 'express-blueforest'
import {cols} from "../../const/collections"
import {col} from "mongo-registry"
import configure from "items-service"

const router = Router()

module.exports = router

const rootService = configure(() => col(cols.ROOT))
const trunkService = configure(() => col(cols.TRUNK))

router.get('/api/tree/branch/:rootId',
    validPathRootId,
    run(rootService.findNoMixin),
    run(trunkService.append(
        "trunkId",
        {name: 1, color: 1, 'quantity.g': 1},
        (root, trunk) => ({
            _id: trunk._id,
            linkId: root._id,
            trunk: {
                name: trunk.name,
                color: trunk.color,
                quantity: {bqt: 1/root.bqt, g: trunk.quantity.g}
            }
        })
    ))
)