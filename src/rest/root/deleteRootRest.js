import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {validPathId} from "../../const/validations"
import configure from "items-service"
import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"

const router = Router()

const deleteRoot = configure(() => col(cols.ROOT)).deleteOne
module.exports = router

router.delete('/api/root/:_id',
    validPathId,
    run(deleteRoot)
)