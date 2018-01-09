const run = require('../../util/run');
const router = require('express').Router();
const {check} = require('express-validator/check');
const units = require('../../service/grandeurs');
const trunks = require('../../service/trunks');

module.exports = router;

router.get('/api/trunks/all',
    run(trunks.all)
);

router.get('/api/trunks',
    [
        check('g').optional().isIn(units.grandeurs),
        check('q').exists()
    ],
    run(({g, q}) => trunks.search(g, q))
);

router.get('/api/trunk',
    [
        check('q').exists()
    ],
    run(({q}) => trunks.lookup(q))
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


router.get('/api/nomaptrunk/:id',
    [
        check('id').exists().isMongoId()
    ],
    run(({id}) => trunks.getNoMap(id))
);