import {branchIdIsNotTrunkId, existingBranchId, existingTrunkId} from "../../const/validations";
import configure from "trees-items-service";
import {cols} from "../../const/collections";
import {col} from "../../db";

import {run} from '../../util/run'
const router = require('express').Router();

const insertBranch = configure(() => col(cols.BRANCH)).insertItem;

module.exports = router;

router.post('/api/branch',
    [
        existingTrunkId,
        existingBranchId,
        branchIdIsNotTrunkId
    ],
    run(({trunk, branch}) => insertBranch(trunk, branch))
);