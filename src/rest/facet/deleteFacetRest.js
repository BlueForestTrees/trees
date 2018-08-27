import {cols} from "../../const/collections"
import {col} from "mongo-registry"
import configure from "items-service"

import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {validPathId} from "../validations"
const router = Router()

const deleteFacet = configure(() => col(cols.FACET)).deleteOne
module.exports = router

router.delete('/api/tree/facet/:_id',
    validPathId,
    run(deleteFacet)
)