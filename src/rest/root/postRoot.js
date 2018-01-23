import {
    ALL_OR_NONE, IS_VALID_UNIT, IS_DECIMAL, EXISTING_TRUNK, IS_NOT_TRUNK_ID,
    BOTH_QT, SHOULD_BE_DEFINED, SHOULD_NOT_BE_DEFINED
} from "../../const/messages";
import {ROOT_ID, ROOT_QT, ROOT_UNIT, TRUNK_ID, TRUNK_QT, TRUNK_UNIT} from "../../const/paths";

const run = require('../../util/run');
const router = require('express').Router();
const {check, oneOf} = require('express-validator/check');
const trunks = require('../../service/trunks');
const units = require('../../service/grandeurs');

module.exports = router;


router.put('/api/root',
    [
        //ID LOGIC
        check(ROOT_ID, IS_NOT_TRUNK_ID).custom((root, {req}) => root._id !== req.body.trunk._id),
        check(TRUNK_ID, EXISTING_TRUNK).custom(trunks.contains),
        check(ROOT_ID, EXISTING_TRUNK).custom(trunks.contains),

        //SIMPLE
        check(TRUNK_ID).exists().isMongoId(),
        check(ROOT_ID).exists().isMongoId(),
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