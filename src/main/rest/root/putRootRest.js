import {ROOT_QT, ROOT_UNIT, TRUNK_QT, TRUNK_UNIT} from "../../const/paths";
import {existingRootId, existingTrunkId, present, rootIdIsNotTrunkId} from "../../const/validations";
import {upsertRoot} from "../../service/root/putRootService";

const run = require('../../util/run');
const router = require('express').Router();

module.exports = router;

router.put('/api/root',
    [
        //ID LOGIC
        existingTrunkId,
        existingRootId,
        rootIdIsNotTrunkId,
        present(ROOT_QT, ROOT_UNIT, TRUNK_QT, TRUNK_UNIT)

    ],
    run(upsertRoot)
);