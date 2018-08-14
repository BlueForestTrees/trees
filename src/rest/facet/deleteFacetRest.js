import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"
import configure from "items-service"

import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {validPathId} from "../../const/validations"
const router = Router()

const deleteFacet = configure(() => col(cols.FACET)).deleteOne
module.exports = router

router.delete('/api/facet/:_id',
    validPathId,
    run(deleteFacet)
)