import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"
import configure from "items-service"

import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {validMongoId, validTreeId} from "../../const/validations"
const router = Router()
const {check} = require('express-validator/check')

const deleteImpacts = configure(() => col(cols.IMPACT)).deleteItems
module.exports = router

router.post('/api/impact/deletion',
    validTreeId,
    validMongoId("impactIds.*"),
    run(({treeId, impactIds}) => deleteImpacts(treeId, impactIds))
)
