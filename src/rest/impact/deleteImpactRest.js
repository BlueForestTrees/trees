import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"
import configure from "items-service"

import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
const router = Router()
const {check} = require('express-validator/check')

const deleteImpacts = configure(() => col(cols.IMPACT)).deleteItems
module.exports = router

router.post('/api/impact/deletion',
    check('treeId').exists().isMongoId(),
    check('impactIds.*').exists().isMongoId(),
    run(({treeId, impactIds}) => deleteImpacts(treeId, impactIds))
)
