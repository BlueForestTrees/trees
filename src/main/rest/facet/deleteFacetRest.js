import {deleteFacets} from "../../service/facet/deleteFacetService";

const run = require('../../util/run');
const express = require('express');
const router = express.Router();
const {check} = require('express-validator/check');


module.exports = router;

router.post('/api/facet/deletion',
    [
        check('treeId').exists().isMongoId(),
        check('facetIds.*').exists().isMongoId()
    ],
    run(deleteFacets)
);
