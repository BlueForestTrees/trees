import {BRANCH_QT, BRANCH_UNIT, TRUNK_QT, TRUNK_UNIT} from "../../const/paths";
import {existingBranchId, existingTrunkId, present, branchIdIsNotTrunkId} from "../../const/validations";
import {upsertBranch} from "../../service/branch/branchCommands";

const run = require('../../util/run');
const router = require('express').Router();

module.exports = router;

router.put('/api/branch',
    [
        existingBranchId,
        existingTrunkId,
        branchIdIsNotTrunkId,
        present(BRANCH_QT, BRANCH_UNIT, TRUNK_QT, TRUNK_UNIT)

    ],
    run(upsertBranch)
);