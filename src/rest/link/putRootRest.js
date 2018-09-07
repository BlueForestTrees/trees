import {col} from "mongo-registry"
import {
    validBodyOptRelativeTo,
    validId,
    validBodyBqt,
    validTrunkId,
    validRootId,
    validOwner,
    validUser
} from "../validations"
import {map} from "lodash"
import {cols} from "../../const/collections"

import {run} from 'express-blueforest'
import {Router} from "express-blueforest"

const router = Router()
const roots = col(cols.ROOT)
const bulkWrite = data => data.length > 0 && roots.bulkWrite(data, {ordered: false})
const prepareTransportsUpdate = bqt => transports => map(transports, transport => ({
    updateOne: {
        filter: {_id: transport._id},
        update: {
            $set: {
                //distance (m) * masse (kg) => km * t
                "bqt": (transport.relativeTo.bqt / 1000) * (bqt / 1000)
            }
        }
    }
}))

module.exports = router

const updateRoot = ({_id, trunkId, rootId, bqt, relativeTo}) =>
    roots
        .updateOne({_id}, {$set: {bqt, relativeTo}})
        .then(
            roots
                .find({"relativeTo._id": rootId}).toArray()
                .then(prepareTransportsUpdate(bqt))
                .then(bulkWrite)
        )

router.put('/api/tree/root',
    validId,
    validBodyBqt,
    validBodyOptRelativeTo,
    validTrunkId,
    validRootId,
    validUser,
    validOwner(roots),
    run(updateRoot)
)
