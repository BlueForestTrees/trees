const run = require('./util/run');
const router = require('express').Router();
const {check} = require('express-validator/check');
const units = require('../service/units');
const trunks = require('../service/trunks');

module.exports = router;

router.get('/api/trunks',
    [
        check('g').optional().isIn(units.grandeurs()),
        check('n').exists()
    ],
    run(({g,n})=>trunks.search(g,n))
);

router.get('/api/trunk/:id',
    [
        check('id').exists().isMongoId(),
    ],
    run(({id})=>trunks.get(id))
);

router.get('/api/trunk/:id/:qt',
    [
        check('id').exists().isMongoId(),
        check('qt').exists().isInt(),
    ],
    run(trunks.load)
);

router.get('/api/trunk/:id/:qt/:unit',
    [
        check('id').exists().isMongoId(),
        check('qt').exists().isInt(),
        check('unit').exists().isIn(units.shortnames())
    ],

    run(trunks.load)
);
