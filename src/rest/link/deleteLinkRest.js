import {valid, validMongoId} from "../../const/validations"
import {removeLink} from "../../topService/linkTopService"
import {run} from 'express-blueforest'

import {Router} from "express-blueforest"

const router = Router()

module.exports = router

router.delete('/api/link/:trunkId/:rootId',
    validMongoId("trunkId"),
    validMongoId("rootId"),
    run(removeLink)
)