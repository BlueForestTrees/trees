import {col} from "../../db";
import {ROOT_QT, ROOT_UNIT, TRUNK_QT, TRUNK_UNIT} from "../../const/paths";
import {optionalRelativeTo, existingRootId, existingTrunkId, present, rootIdIsNotTrunkId} from "../../const/validations";

import configure from "trees-items-service";
import {cols} from "../../const/collections";

import {run} from '../../util/run'
const router = require('express').Router();

const upsertRoot = configure(() => col(cols.ROOT)).upsertItem;

module.exports = router;

router.put('/api/root',
    [
        //ID LOGIC
        existingTrunkId,
        existingRootId,
        optionalRelativeTo,
        rootIdIsNotTrunkId,
        present(ROOT_QT, ROOT_UNIT, TRUNK_QT, TRUNK_UNIT)
    ],
    run(({trunk, root}) => upsertRoot(trunk, root))
);