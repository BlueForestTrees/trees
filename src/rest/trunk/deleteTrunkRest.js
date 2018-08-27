import {validId} from "../validations"
import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {cols} from "../../const/collections"
import {col} from "mongo-registry"
import configure from "items-service"

const router = Router()

module.exports = router

const trunkService = configure(() => col(cols.TRUNK))

router.delete('/api/tree/trunk/:_id',
    validId,
    run(trunkService.deleteOne)
)