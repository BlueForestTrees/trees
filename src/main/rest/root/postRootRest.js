const run = require('../../util/run');
const router = require('express').Router();
import {existingRootId, existingTrunkId, leftIdIsNotRightId} from "../../const/validations";
import {cols} from "../../const/collections";
import {col} from "../../db";
import configure from "trees-items-service";

const insertRoot = configure(() => col(cols.ROOT)).insertItem;

module.exports = router;

router.post('/api/root',
    [
        existingTrunkId,
        existingRootId,
        leftIdIsNotRightId
    ],
    run(({trunk, root}) => insertRoot(trunk, root))
);