import {existingId} from "../../const/validations";
import {getTrunk, searchOrAll} from "../../service/trunk/getTrunkService";
import {grandeurs} from "../../service/grandeur/grandeursService";

const run = require('../../util/run');
const router = require('express').Router();
const {check} = require('express-validator/check');

module.exports = router;

router.get('/api/trunks',
    [
        check('g').optional().isIn(grandeurs),
        check('q').optional().exists()
    ],
    run(({g, q}) => searchOrAll(g, q))
);

router.get('/api/trunk/:_id',
    [
        existingId
    ],
    run(({_id}) => getTrunk(_id))
);