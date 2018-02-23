import {validTreeId} from "../../const/validations";
import {setImpact} from "../../service/impact/postImpactService";
import {shortnames} from "../../service/grandeur/grandeursService";

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
        check('impact.quantity.unit').isIn(shortnames)
    ],
    run(setImpact)
);