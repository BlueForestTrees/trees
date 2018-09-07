import {branchIdIsNotTrunkId, validBodyBqt, validId, validOwner, validUser} from "../validations"
import {cols} from "../../const/collections"
import {col} from "mongo-registry"
import configure from "items-service"

import {run} from 'express-blueforest'
import {Router} from "express-blueforest"; const router = Router()

const roots = col(cols.ROOT)
const rootService = configure(() => col(cols.ROOT))

module.exports = router

const branchToRoot = ({_id, bqt}) => ({_id, bqt:1/bqt})

router.put('/api/tree/branch',
    validId,
    validBodyBqt,
    branchIdIsNotTrunkId,
    run(branchToRoot),
    validUser,
    validOwner(roots),
    run(({_id, bqt}) => ({filter: {_id}, item: {bqt}})),
    run(rootService.filteredUpdate)
)