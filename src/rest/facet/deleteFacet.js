const run = require('../../util/run');
const express = require('express');
const router = express.Router();
const facets = require("../../service/facets");
const {check} = require('express-validator/check');


module.exports = router;

router.post('/api/facets/deletions',
    [
        check('treeId').exists().isMongoId(),
        check('facetIds.*').exists().isMongoId()
    ],
    run(facets.deleteFacets)
);
