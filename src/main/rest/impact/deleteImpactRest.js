import {deleteImpacts} from "../../service/impact/deleteImpactService";

const run = require('../../util/run');
const express = require('express');
const router = express.Router();
const {check} = require('express-validator/check');


module.exports = router;

router.post('/api/impact/deletion',
    [
        check('treeId').exists().isMongoId(),
        check('impactIds.*').exists().isMongoId()
    ],
    run(deleteImpacts)
);
