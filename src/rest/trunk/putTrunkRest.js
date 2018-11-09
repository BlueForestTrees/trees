import {
    validOptionalBodyBqtG,
    validOptionalBodyName,
    validPathId,
    validUser, validOwner
} from "../../validations"
import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {cols} from "../../collections"
import {col} from "mongo-registry"

const router = Router()
module.exports = router

router.put('/api/tree/trunk/:_id',
    validPathId,
    validOptionalBodyName,
    validOptionalBodyBqtG,
    validUser,
    validOwner(col(cols.TRUNK)),
    run(trunk => col(cols.TRUNK).updateOne({_id: trunk._id}, {$set: trunk}))
)