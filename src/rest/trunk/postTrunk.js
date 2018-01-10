const run = require('../../util/run');
const runraw = require('../../util/runraw');
const router = require('express').Router();
const {check} = require('express-validator/check');
const units = require('../../service/grandeurs');
const trunks = require('../../service/trunks');

module.exports = router;

router.post('/api/trunks/all',
    runraw(trunks.putall)
);

router.post('/api/trunk',
    [
        check('qt').optional().isDecimal(),
        check('unit').optional().isIn(units.shortnames),
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

router.post('/api/root/qtunit',
    [
        check('trunk._id').exists().isMongoId(),
        check('trunk.qt').optional().exists().isDecimal(),
        check('root._id').exists().isMongoId(),
        check('root.qt').exists().isDecimal(),

        check('root._id', 'root._id and trunk.id must be different').custom((root, {req}) => root._id !== req.body.trunk._id),
        check('trunk._id', 'specified trunk doesn\'t exist').custom(trunks.contains),
        check('root._id', 'specified root doesn\'t exist').custom(trunks.contains)
    ],
    run(trunks.setRootQtUnit)
);

router.post('/api/trunk/facet',
    [
        check('treeId').exists().isMongoId(),
        check('facet._id').isMongoId(),
        check('facet.qt').isDecimal(),
        check('facet.unit').isIn(units.shortnames),
        check('facet.name').matches(/^.+/)
    ],
    run(trunks.addFacet)
);

router.post('/api/trunk/price',
    [
        check('treeId').exists().isMongoId(),
        check('price').isDecimal()
    ],
    run(trunks.upsertPrice)
);

router.post('/api/trunk/quantity',
    [
        check('treeId').exists().isMongoId(),
        check('quantity.qt').isDecimal(),
        check('quantity.unit').isIn(units.shortnames)
    ],
    run(trunks.upsertQuantity)
);