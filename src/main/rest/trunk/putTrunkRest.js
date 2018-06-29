import {validId} from "../../const/validations";
import {NAME, QUANTITY} from "../../const/paths";
import {SHOULD_BE_DEFINED, SHOULD_NOT_BE_DEFINED} from "../../const/messages";

const {oneOf} = require('express-validator/check');

import {run} from '../../util/run'
const router = require('express').Router();
const {check} = require('express-validator/check');
const trunks = require('../../service/trunk/putTrunkService');

module.exports = router;

router.put('/api/trunk/:_id',
    validId,
    oneOf([
        [
            check(NAME, SHOULD_BE_DEFINED).exists().matches(/^.+/),
            check(QUANTITY, SHOULD_NOT_BE_DEFINED).not().exists()
        ],
        [
            check(NAME, SHOULD_NOT_BE_DEFINED).not().exists(),
            check(QUANTITY, SHOULD_BE_DEFINED).exists(),
        ],
    ]),
    run(trunks.update)
);