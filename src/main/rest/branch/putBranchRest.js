import {BRANCH_QT, BRANCH_UNIT, TRUNK_QT, TRUNK_UNIT} from "../../const/paths";
import {branchIdIsNotTrunkId, existingBranchId, existingTrunkId, present} from "../../const/validations";
import {cols} from "../../const/collections";
import {col} from "../../db";
import configure from "trees-items-service";

import {run} from '../../util/run'
const router = require('express').Router();

const upsertBranch = configure(() => col(cols.BRANCH)).upsertItem;

module.exports = router;

router.put('/api/branch',
    existingBranchId,
    existingTrunkId,
    branchIdIsNotTrunkId,
    present(BRANCH_QT, BRANCH_UNIT, TRUNK_QT, TRUNK_UNIT),
    run(({trunk, branch}) => upsertBranch(trunk, branch))
);