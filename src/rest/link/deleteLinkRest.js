import {valid} from "../../const/validations"
import {removeLink} from "../../topService/linkTopService"
import {run} from 'express-json-api'

import {Router} from "express-json-api"

const router = Router()

module.exports = router

router.delete('/api/link/:trunkId/:rootId',
    valid("trunkId"),
    valid("rootId"),
    run(removeLink)
)