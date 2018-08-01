import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"
import configure from "items-service"

import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
const router = Router()
const {check} = require('express-validator/check')

const deleteFacets = configure(() => col(cols.FACET)).deleteItems
module.exports = router

router.post('/api/facet/deletion',
    check('treeId').exists().isMongoId(),
    check('facetIds.*').exists().isMongoId(),
    run(({treeId, facetIds}) => deleteFacets(treeId, facetIds))
)