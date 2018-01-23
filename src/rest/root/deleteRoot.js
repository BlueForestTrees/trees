import {existingRootId, existingTrunkId} from "../../const/validations";


const run = require('../../util/run');
const express = require('express');
const router = express.Router();
const trunks = require('../../service/trunks');

module.exports = router;

router.delete('/api/root/:trunkId/:rootId',
    [
        existingTrunkId,
        existingRootId,
    ],
    run(trunks.removeRoot)
);