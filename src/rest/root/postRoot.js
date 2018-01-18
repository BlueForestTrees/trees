const run = require('../../util/run');
const router = require('express').Router();
const {check} = require('express-validator/check');
const trunks = require('../../service/trunks');
const units = require('../../service/grandeurs');

module.exports = router;

router.post('/api/root',
    [
        check('trunkId').exists().isMongoId(),
        check('rootId').exists().isMongoId(),
    ],

    run(trunks.addRoot)
);

router.put('/api/root',
    [
        check('trunk._id').exists().isMongoId(),
        check('trunk.qt').exists().isDecimal(),
        check('trunk.unit').exists().isIn(units.shortnames),
        check('root._id').exists().isMongoId(),
        check('root.qt').exists().isDecimal(),
        check('root.unit').exists().isIn(units.shortnames),

        check('root._id', 'root._id and trunk.id must be different').custom((root, {req}) => root._id !== req.body.trunk._id),
        check('trunk._id', 'specified trunk doesn\'t exist').custom(trunks.contains),
        check('root._id', 'specified root doesn\'t exist').custom(trunks.contains)
    ],
    run(trunks.setRootQtUnit)
);