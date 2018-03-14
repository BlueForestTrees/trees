import {valid} from "../../const/validations";
import configure from "trees-items-service";
import {cols} from "../../const/collections";
import {col} from "../../db";

const run = require('../../util/run');
const router = require('express').Router();

const deleteRoot = configure(() => col(cols.ROOT)).removeItem;
module.exports = router;

router.delete('/api/root/:trunkId/:rootId',
    [
        valid("trunkId"),
        valid("rootId"),
    ],
    run(({trunkId, rootId}) => deleteRoot(trunkId, rootId))
);
