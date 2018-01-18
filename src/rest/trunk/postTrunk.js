const run = require('../../util/run');
const runraw = require('../../util/runraw');
const _ = require('lodash');
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
        check('name').optional().matches(/^.+/),
        check('sourceId').optional().isMongoId(),
        check('sourceId', 'body.name OR sourceId must be defined').custom((sourceId, {req}) => {
            const noBody = _.isEmpty(req.body);
            const noSourceId = !sourceId;

            return (!noBody && noSourceId) || (noBody && !noSourceId)
        })
    ],
    run(trunks.createOrClone)
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