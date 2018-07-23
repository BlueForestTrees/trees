import {col} from "trees-db-version/dist";
import {ROOT_QT, ROOT_UNIT, TRUNK_QT, TRUNK_UNIT} from "../../const/paths";
import {existingRootId, existingTrunkId, present, rootIdIsNotTrunkId, validRelativeTo} from "../../const/validations";

import configure from "trees-items-service";
import {cols} from "../../const/collections";

import {run} from '../../util/run'
const router = require('express').Router();

const upsertRoot = configure(() => col(cols.ROOT)).upsertItem;

module.exports = router;

router.put('/api/root',
    existingTrunkId,
    existingRootId,
    validRelativeTo,
    rootIdIsNotTrunkId,
    present(ROOT_QT, ROOT_UNIT, TRUNK_QT, TRUNK_UNIT),
    run(({trunk, root}) => cleanUpsert(trunk, root))
);

const cleanUpsert = (trunk, root) => {
    if (!root.relativeTo) {
        delete root.relativeTo;
    }
    return upsertRoot(trunk, root);
};