import {existingId} from "../../const/validations";

const run = require('../../util/run');
const router = require('express').Router();
const {check} = require('express-validator/check');
const units = require('../../service/grandeurs');
const trunks = require('../../service/trunks');

module.exports = router;

router.get('/api/trunks',
    [
        check('g').optional().isIn(units.grandeurs),
        check('q').optional().exists()
    ],
    run(({g, q}) => trunks.searchOrAll(g, q))
);

router.get('/api/trunk',
    [
        check('q').exists()
    ],
    run(({q}) => trunks.lookup(q))
);

router.get('/api/trunk/:_id',
    [
        existingId
    ],
    run(({_id}) => trunks.get(_id))
);

router.get('/api/trunk/:qt/:_id',
    [
        existingId,
        check('qt').isDecimal()
    ],
    run(({_id, qt}) => trunks.get(_id, qt))
);


router.get('/api/nomaptrunk/:_id',
    [
        existingId
    ],
    run(({_id}) => trunks.getNoMap(_id))
);