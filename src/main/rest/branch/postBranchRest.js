import {existingBranchId, existingTrunkId, branchIdIsNotTrunkId} from "../../const/validations";
import {insertBranch} from "../../service/branch/branchCommands";

const run = require('../../util/run');
const router = require('express').Router();

module.exports = router;

router.post('/api/branch',
    [
        existingBranchId,
        existingTrunkId,
        branchIdIsNotTrunkId
    ],
    run(insertBranch)
);