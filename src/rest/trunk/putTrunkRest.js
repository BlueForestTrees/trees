import {validOptionalBodyBqtG, validOptionalBodyName, validPathId} from "../../const/validations"
import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"
import configure from "items-service"

const router = Router()
module.exports = router

const trunkService = configure(() => col(cols.TRUNK))

router.put('/api/trunk/:_id',
    validPathId,
    validOptionalBodyName,
    validOptionalBodyBqtG,
    run(trunkService.update)
)