import {col} from "mongo-registry"
import {validRootId, validTrunkId, rootIdIsNotTrunkId, validBodyOptRelativeTo, validId, validBodyBqt} from "../validations"

import configure from "items-service"
import {cols} from "../../const/collections"

import {run} from 'express-blueforest'
import {Router} from "express-blueforest"

const router = Router()
const rootService = configure(() => col(cols.ROOT))

module.exports = router

router.put('/api/root',
    validId,
    validTrunkId,
    validRootId,
    validBodyBqt,
    validBodyOptRelativeTo,
    
    rootIdIsNotTrunkId,
    run(({_id, trunkId, rootId, bqt, relativeTo}) => ({filter: {_id, trunkId, rootId}, item: {bqt, relativeTo}})),
    run(rootService.filteredUpdate)
)