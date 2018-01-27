import {
    ALL_OR_NONE, IS_VALID_UNIT, IS_DECIMAL,
    SHOULD_BE_DEFINED, SHOULD_NOT_BE_DEFINED
} from "../../const/messages";
import {ROOT_QT, ROOT_UNIT, TRUNK_QT, TRUNK_UNIT} from "../../const/paths";
import {
    existingRootId, rootIdIsNotTrunkId, existingTrunkId, optionalUnit,
    optionalDecimal, present, absent
} from "../../const/validations";
import {upsertRoot} from "../../service/root/postRootService";

const run = require('../../util/run');
const router = require('express').Router();
const {oneOf} = require('express-validator/check');

module.exports = router;


router.post('/api/root',
    [
        //ID LOGIC
        existingTrunkId,
        existingRootId,
        rootIdIsNotTrunkId,

        //QT UNIT
        optionalDecimal(TRUNK_QT),
        optionalDecimal(ROOT_QT),
        optionalUnit(TRUNK_UNIT),
        optionalUnit(ROOT_UNIT),

        //QUANTITY : ALL OR NONE
        oneOf([
            present(ROOT_QT, ROOT_UNIT, TRUNK_QT, TRUNK_UNIT),
            absent(ROOT_QT, ROOT_UNIT, TRUNK_QT, TRUNK_UNIT)
        ], ALL_OR_NONE),

    ],
    run(upsertRoot)
);