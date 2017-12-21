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
        check('trunk._id').exists().isMongoId(),
        check('trunk.qt').optional().exists().isNumeric(),
        check('root._id').exists().isMongoId(),
        check('root.qt').exists().isNumeric(),

        check('root._id', 'rootId and trunkId must be different').custom((rootId, {req}) => rootId !== req.body.trunkId),
        check('trunk._id', 'specified trunk doesn\'t exist').custom(trunks.contains),
        check('root._id', 'specified root doesn\'t exist').custom(trunks.contains)
    ],
    run(trunks.setRootQtUnit)
);