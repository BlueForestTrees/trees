import {validTreeId, validUnit} from "../../const/validations";
import {setImpact} from "../../service/impact/postImpactService";

const run = require('../../util/run');
const _ = require('lodash');
const router = require('express').Router();
const {check} = require('express-validator/check');

module.exports = router;

router.post('/api/impact/:treeId',
    [
        validTreeId,
        check('impact._id').isMongoId(),
        check('impact.quantity.qt').isDecimal(),
        validUnit('impact.quantity.unit')
    ],
    run(setImpact)
);