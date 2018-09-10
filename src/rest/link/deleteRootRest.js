import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {validOwner, validPathId, validUser} from "../../validations"
import configure from "items-service"
import {cols} from "../../collections"
import {col} from "mongo-registry"

const router = Router()

const roots = col(cols.ROOT)
const deleteRoot = configure(() => col(cols.ROOT)).deleteOne
module.exports = router

router.delete('/api/tree/root/:_id',
    validPathId,
    validUser,
    validOwner(roots),
    run(deleteRoot),
)