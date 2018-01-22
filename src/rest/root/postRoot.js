import {
    BOTH_OR_NONE, IS_VALID_UNIT, IS_DECIMAL, EXISTING_TRUNK, IS_NOT_TRUNK_ID,
    ROOT_IF_TRUNK
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
        //SIMPLE
        check(TRUNK_ID).exists().isMongoId(),
        check(ROOT_ID).exists().isMongoId(),


        check(TRUNK_QT,IS_DECIMAL).optional().exists().isDecimal(),
        check(TRUNK_UNIT,IS_VALID_UNIT).optional().exists().isIn(units.shortnames),

        check(ROOT_QT,IS_DECIMAL).optional().exists().isDecimal(),
        check(ROOT_UNIT,IS_VALID_UNIT).optional().exists().isIn(units.shortnames),

        //ID LOGIC
        check(ROOT_ID, IS_NOT_TRUNK_ID).custom((root, {req}) => root._id !== req.body.trunk._id),
        check(TRUNK_ID, EXISTING_TRUNK).custom(trunks.contains),
        check(ROOT_ID, EXISTING_TRUNK).custom(trunks.contains),

        //QT UNIT LOGIC
        oneOf([
            [
                check(TRUNK_QT).exists(),
                check(TRUNK_UNIT).exists()
            ],
            [
                check(TRUNK_QT).not().exists(),
                check(TRUNK_UNIT).not().exists()
            ]
        ], BOTH_OR_NONE),
        oneOf([
            [
                check(ROOT_QT).exists(),
                check(ROOT_UNIT).exists()
            ],
            [
                check(ROOT_QT).not().exists(),
                check(ROOT_UNIT).not().exists()
            ]
        ], BOTH_OR_NONE),
        oneOf([
            [
                check(ROOT_QT).exists(),
                check(TRUNK_QT).exists()
            ],
            [
                check(ROOT_QT).exists(),
                check(TRUNK_QT).not().exists()
            ]
        ], ROOT_IF_TRUNK),


    ],
    run(trunks.upsertRoot)
);