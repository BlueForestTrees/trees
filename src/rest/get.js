const run = require('./util/run');
const router = require('express').Router();
const {check} = require('express-validator/check');
const units = require('../service/units');
const trunks = require('../service/trunks');

module.exports = router;

router.get('/api/all',
    run(trunks.headersAll)
);

router.get('/api/trunks',
    [
        check('g').optional().isIn(units.grandeurs()),
        check('n').exists()
    ],
    run(({g,n})=>trunks.search(g,n))
);

router.get('/api/trunk/:id',
    [
        check('id').exists().isMongoId()
    ],
    run(({id})=>trunks.get(id))
);
