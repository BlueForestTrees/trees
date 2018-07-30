import {cols} from "../../const/collections";
import {col} from "trees-db-version/dist";
import configure from "trees-items-service";

import {run} from 'trees-express'
import {Router} from "trees-express";
const router = Router();
const {check} = require('express-validator/check');

const deleteImpacts = configure(() => col(cols.IMPACT)).deleteItems;
module.exports = router;

router.post('/api/impact/deletion',
    check('treeId').exists().isMongoId(),
    check('impactIds.*').exists().isMongoId(),
    run(({treeId, impactIds}) => deleteImpacts(treeId, impactIds))
);
