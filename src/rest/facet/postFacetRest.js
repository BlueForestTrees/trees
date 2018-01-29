import {validTreeId} from "../../const/validations";
import {setFacet} from "../../service/facet/postFacetService";

const run = require('../../util/run');
const _ = require('lodash');
const router = require('express').Router();
const {check} = require('express-validator/check');
const units = require('../../service/grandeursService');

module.exports = router;

router.post('/api/facet/:treeId',
    [
        validTreeId,
        check('facet._id').isMongoId(),
        check('facet.qt').isDecimal(),
        check('facet.unit').isIn(units.shortnames)
    ],
    run(setFacet)
);