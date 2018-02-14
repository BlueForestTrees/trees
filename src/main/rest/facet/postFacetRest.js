import {validTreeId} from "../../const/validations";
import {setFacet} from "../../service/facet/postFacetService";
import {shortnames} from "../../service/grandeur/grandeursService";

const run = require('../../util/run');
const _ = require('lodash');
const router = require('express').Router();
const {check} = require('express-validator/check');

module.exports = router;

router.post('/api/facet/:treeId',
    [
        validTreeId,
        check('facet._id').isMongoId(),
        check('facet.quantity.qt').isDecimal(),
        check('facet.quantity.unit').isIn(shortnames)
    ],
    run(setFacet)
);