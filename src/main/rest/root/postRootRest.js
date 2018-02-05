import {existingRootId, existingTrunkId, rootIdIsNotTrunkId} from "../../const/validations";
import {insertRoot} from "../../service/root/postRootService";

const run = require('../../util/run');
const router = require('express').Router();

module.exports = router;

router.post('/api/root',
    [
        //ID LOGIC
        existingTrunkId,
        existingRootId,
        rootIdIsNotTrunkId
    ],
    run(insertRoot)
);