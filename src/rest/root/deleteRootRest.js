import {existingRootId, existingTrunkId} from "../../const/validations";
import {removeRoot} from "../../service/root/deleteRootService";

const run = require('../../util/run');
const express = require('express');
const router = express.Router();

module.exports = router;

router.delete('/api/root/:trunkId/:rootId',
    [
        existingTrunkId,
        existingRootId,
    ],
    run(removeRoot)
);