import {valid} from "../../const/validations";
import {cols} from "../../const/collections";
import {col} from "../../db";
import configure from "trees-items-service";

const run = require('../../util/run');
const router = require('express').Router();

const deleteBranch = configure(() => col(cols.BRANCH)).removeItem;

module.exports = router;

router.delete('/api/branch/:trunkId/:branchId',
    [
        valid("trunkId"),
        valid("branchId"),
    ],
    run(({trunkId, branchId}) => deleteBranch(trunkId, branchId))
);