import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {validPathId} from "../validations"
import configure from "items-service"
import {cols} from "../../const/collections"
import {col} from "mongo-registry"

const router = Router()

const deleteRoot = configure(() => col(cols.ROOT)).deleteOne
module.exports = router

router.delete('/api/tree/root/:_id',
    validPathId,
    run(deleteRoot),
)