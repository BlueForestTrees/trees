const run = require('./util/run');
const router = require('express').Router();
const {check} = require('express-validator/check');
const units = require('../service/units');
const trunks = require('../service/trunks');

module.exports = router;

router.post('/api/trunk',
    [
        check('qt').optional().isNumeric(),
        check('unit').optional().isIn(units.shortnames()),
        check('name').matches(/^.+/)
    ],
    run(trunks.create)
);

router.post('/api/root',
    [
        check('trunkId').exists().isMongoId(),
        check('rootId').exists().isMongoId(),
    ],

    run(trunks.addRoot)
);

router.post('/api/qtunit',
    [
        check('trunkId').exists().isMongoId(),
        check('rootId').exists().isMongoId(),
        check('qt').exists().isInt(),
        check('unit').exists().isIn(units.shortnames()),

        check('rootId', 'rootId and trunkId must be different').custom((rootId, {req}) => rootId !== req.body.trunkId),
        check('trunkId', 'specified trunk doesn\'t exist').custom(trunks.contains),
        check('rootId', 'specified root doesn\'t exist').custom(trunks.contains)
    ],
    run(trunks.setRootQtUnit)
);