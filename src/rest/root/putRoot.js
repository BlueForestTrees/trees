import {
    ALL_OR_NONE, IS_VALID_UNIT, IS_DECIMAL,
    SHOULD_BE_DEFINED, SHOULD_NOT_BE_DEFINED
} from "../../const/messages";
import {ROOT_QT, ROOT_UNIT, TRUNK_QT, TRUNK_UNIT} from "../../const/paths";
import {existingRootId, rootIdIsNotTrunkId, existingTrunkId} from "../../const/validations";

const run = require('../../util/run');
const router = require('express').Router();
const {check, oneOf} = require('express-validator/check');
const trunks = require('../../service/trunks');
const units = require('../../service/grandeurs');

module.exports = router;


router.put('/api/root',
    [
        //ID LOGIC
        existingTrunkId,
        existingRootId,
        rootIdIsNotTrunkId,

        //SIMPLE
        check(TRUNK_QT,IS_DECIMAL).optional().exists().isDecimal(),
        check(TRUNK_UNIT,IS_VALID_UNIT).optional().exists().isIn(units.shortnames),
        check(ROOT_QT,IS_DECIMAL).optional().exists().isDecimal(),
        check(ROOT_UNIT,IS_VALID_UNIT).optional().exists().isIn(units.shortnames),

        //QUANTITY : ALL OR NONE
        oneOf([
            [
                check(ROOT_QT, SHOULD_BE_DEFINED).exists(),
                check(ROOT_UNIT, SHOULD_BE_DEFINED).exists(),
                check(TRUNK_QT, SHOULD_BE_DEFINED).exists(),
                check(TRUNK_UNIT, SHOULD_BE_DEFINED).exists()
            ],
            [
                check(ROOT_QT, SHOULD_NOT_BE_DEFINED).not().exists(),
                check(ROOT_UNIT, SHOULD_NOT_BE_DEFINED).not().exists(),
                check(TRUNK_QT, SHOULD_NOT_BE_DEFINED).not().exists(),
                check(TRUNK_UNIT, SHOULD_NOT_BE_DEFINED).not().exists()
            ]
        ], ALL_OR_NONE),

    ],
    run(trunks.upsertRoot)
);