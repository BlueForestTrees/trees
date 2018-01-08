const run = require('./util/run');
const router = require('express').Router();
const {check} = require('express-validator/check');
const units = require('../service/units');
const trunks = require('../service/trunks');

module.exports = router;

router.get('/api/all',
    run(trunks.all)
);

router.get('/api/trunks',
    [
        check('g').optional().isIn(units.grandeurs),
        check('n').exists()
    ],
    run(({g, n}) => trunks.search(g, n))
);

router.get('/api/trunk/:_id',
    [
        check('_id').exists().isMongoId()
    ],
    run(({_id}) => trunks.get(_id))
);

router.get('/api/trunk/:qt/:_id',
    [
        check('_id').exists().isMongoId(),
        check('qt').isDecimal()
    ],
    run(({_id, qt}) => trunks.get(_id, qt))
);


router.get('/trunk/nomap/:id',
    [
        check('id').exists().isMongoId()
    ],
    run(({id}) => trunks.getNoMap(id))
);