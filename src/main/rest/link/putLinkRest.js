import {ROOT_QT, ROOT_UNIT, TRUNK_QT, TRUNK_UNIT} from "../../const/paths";
import {existingRootId, existingTrunkId, present, rootIdIsNotTrunkId} from "../../const/validations";
import {upsertLink} from "../../topService/linkTopService";

import {run} from '../../util/run'
const router = require('express').Router();

module.exports = router;

router.put('/api/link',
    [
        //ID LOGIC
        existingTrunkId,
        existingRootId,
        rootIdIsNotTrunkId,
        present(ROOT_QT, ROOT_UNIT, TRUNK_QT, TRUNK_UNIT)

    ],
    run(upsertLink)
);