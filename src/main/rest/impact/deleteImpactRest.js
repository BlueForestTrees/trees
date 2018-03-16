import {cols} from "../../const/collections";
import {col} from "../../db";
import configure from "trees-items-service";

const run = require('../../util/run');
const express = require('express');
const router = express.Router();
const {check} = require('express-validator/check');

const deleteImpacts = configure(() => col(cols.IMPACT)).deleteItems;
module.exports = router;

router.post('/api/impact/deletion',
    [
        check('treeId').exists().isMongoId(),
        check('impactIds.*').exists().isMongoId()
    ],
    run(({treeId, impactIds}) => deleteImpacts(treeId, impactIds))
);
