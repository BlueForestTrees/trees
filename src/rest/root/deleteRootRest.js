import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {validPathId} from "../validations"
import configure from "items-service"
import {cols} from "../../const/collections"
import {col} from "mongo-registry"

const router = Router()

const rootService = configure(() => col(cols.ROOT))
module.exports = router

router.delete('/api/root/:_id',
    validPathId,
    run(rootService.deleteOne),
)