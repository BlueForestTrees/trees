import {existingRootId, existingTrunkId, rootIdIsNotTrunkId} from "../../const/validations";
import {insertLink} from "../../topService/linkTopService";

import {run} from '../../util/run'
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