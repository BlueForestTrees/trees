import run from '../../util/run';
import express from "express";
import {existingRootId, existingTrunkId, rootIdIsNotTrunkId} from "../../const/validations";
import {cols} from "../../const/collections";
import {col} from "../../db";
import configure from "trees-items-service";

const router = express.Router();
const insertRoot = configure(() => col(cols.ROOT)).insertItem;

module.exports = router;

router.post('/api/root',
    [
        existingTrunkId,
        existingRootId,
        rootIdIsNotTrunkId
    ],
    run(({trunk, root}) => insertRoot(trunk, root))
);