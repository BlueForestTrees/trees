const run = require('./util/run');
const express = require('express');
const router = express.Router();
const {check} = require('express-validator/check');
const units = require('../service/units');
const trunks = require('../service/trunks');
const headers = require('../service/headers');

module.exports = router;

router.post('/api/trunk',
    [
        check('qt').optional().isNumeric(),
        check('unit').optional().isIn(units.shortNames()),
        check('name').isLength({min: 1})
    ],
    run(trunks.create)
);

router.post('/api/root',
    [
        check('trunkId').exists(),
        check('rootId').exists(),
        check('trunkQt').exists().isInt(),
        check('rootQt').exists().isInt(),
        check('unit').exists().isIn(units.shortNames()),

        check('rootId', 'rootId and trunkId must be different').custom((rootId, {req}) => rootId !== req.body.trunkId),
        check('trunkId', 'specified trunk doesn\'t exist').custom(trunks.contains),
        check('rootId', 'specified root doesn\'t exist').custom(trunks.contains)
    ],

    run(trunks.addRoot)
);

router.delete('/api/trunk/:id',
    [
        check('id').exists().isMongoId(),
    ],
    run(({id})=>trunks.remove(id))
);

router.get('/api/trunk/:id',
    [
        check('id').exists().isMongoId(),
    ],
    run(({id})=>trunks.get(id))
);

router.delete('/api/root/:trunkId/:rootId',
    [
        check('trunkId').exists().isMongoId(),
        check('rootId').exists().isMongoId()
    ],
    run(trunks.removeRoot)
);

router.get('/api/trunks',
    [
        check('qt'),
        check('unit'),
        check('name').exists()
    ],
    run(trunks.search)
);

router.get('/api/all',
    run(headers.all)
);

router.get('/api/trunk/:id/:qt',
    [
        check('id').exists().isMongoId(),
        check('qt').exists().isInt(),
    ],
    run(trunks.getWithQtUnit)
);

router.get('/api/trunk/:id/:qt/:unit',
    [
        check('id').exists().isMongoId(),
        check('qt').exists().isInt(),
        check('unit').exists().isIn(units.shortNames())
    ],

    run(trunks.getWithQtUnit)
);

router.get('/api/purge',
    run(trunks.purge)
);