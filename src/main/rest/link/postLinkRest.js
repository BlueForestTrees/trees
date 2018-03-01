import {existingRootId, existingTrunkId, rootIdIsNotTrunkId} from "../../const/validations";
import {insertLink} from "../../topService/linkTopService";

const run = require('../../util/run');
const router = require('express').Router();

module.exports = router;

router.post('/api/link',
    [
        existingTrunkId,
        existingRootId,
        rootIdIsNotTrunkId
    ],
    run(insertLink)
);