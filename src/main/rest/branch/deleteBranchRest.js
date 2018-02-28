import {valid} from "../../const/validations";
import {removeBranch} from "../../service/branch/branchCommands";

const run = require('../../util/run');
const express = require('express');
const router = express.Router();

module.exports = router;

router.delete('/api/branch/:branchId/:trunkId',
    [
        valid("trunkId"),
        valid("branchId"),
    ],
    run(removeBranch)
);