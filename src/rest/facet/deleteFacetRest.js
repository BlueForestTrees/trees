import {cols} from "../../const/collections";
import {col} from "trees-db-version/dist";
import configure from "trees-items-service";

import {run} from 'trees-express'
import {Router} from "trees-express";
const router = Router();
const {check} = require('express-validator/check');

const deleteFacets = configure(() => col(cols.FACET)).deleteItems;
module.exports = router;

router.post('/api/facet/deletion',
    check('treeId').exists().isMongoId(),
    check('facetIds.*').exists().isMongoId(),
    run(({treeId, facetIds}) => deleteFacets(treeId, facetIds))
);