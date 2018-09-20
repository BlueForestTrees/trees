import {validPathTrunkId} from "../../validations"
import {run} from 'express-blueforest'
import {Router} from "express-blueforest";
import {omit} from 'lodash'
import {mergeList, extraireFeuilles} from "../../util/calculations"
import {cols} from "../../collections"
import {col} from "mongo-registry"
import configure from "items-service"

const router = Router()
module.exports = router

const trunkService = configure(() => col(cols.TRUNK))

const loadTree = configure(() => col(cols.ROOT)).treeRead(cols.ROOT, "trunkId","rootId")

router.get('/api/tree/tank/:trunkId',
    validPathTrunkId,
    run(loadTree, "TREE"),
    run(extraireFeuilles, "TANK"),
    run(mergeList),
    run(trunkService.append(
        "_id",
        {name: 1, color: 1, 'quantity.g': 1},
        (tankItem, trunk) => ({
            _id: tankItem._id,
            trunk: {
                name: trunk.name,
                color: trunk.color,
                quantity: {bqt: tankItem.bqt, g: trunk.quantity.g}
            }
        })
    ))
)