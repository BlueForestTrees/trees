const json = require('./util/json');
const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
const {matchedData, sanitize} = require('express-validator/filter');
const units = require('../service/units');
const trunks = require('../service/trunks');
const headers = require('../service/headers');

module.exports = router;

router.post('/api/trunk',
    [
        check('qt').optional().isNumeric(),
        check('unit').optional().isIn(units.shortNames()),
        check('name').isLength({ min: 1 })
    ],

    json(async (req, res, next) => {
        validationResult(req).throw();
        return trunks.create(matchedData(req));
    })
);

router.post('/api/root',
    [
        check('trunkId').exists(),
        check('rootId').exists(),
        check('trunkQt').exists().isInt(),
        check('rootQt').exists().isInt(),
        check('unit').exists().isIn(units.shortNames()),

        check('rootId', 'rootId and trunkId must be different').custom((rootId, {req}) => rootId !== req.body.trunkId),
        check('trunkId', 'specified trunk doesn\'t exist').custom((value) => trunks.contains(value)),
        check('rootId', 'specified root doesn\'t exist').custom((value) => trunks.contains(value))
    ],

    json(async (req, res, next) => {
        validationResult(req).throw();

        const rootCreation = matchedData(req);
        const trunk = await trunks.get(rootCreation.trunkId);
        const root = {
            rootId: rootCreation.rootId,
            qt: rootCreation.rootQt * (trunk.qt / rootCreation.trunkQt),
            unit: rootCreation.unit
        };

        return trunks.addRoot(trunk, root);

    })
);

router.delete('/api/trunk/:trunkId',
    [
        check('trunkId').exists().isMongoId(),
    ],
    json(async (req) => {
            validationResult(req).throw();
            return trunks.remove(req.params.trunkId);
        }
    )
);

router.delete('/api/root/:trunkId/:rootId',
    [
        check('trunkId').exists().isMongoId(),
        check('rootId').exists().isMongoId()
    ],
    json(async (req) => {
            validationResult(req).throw();
            return trunks.removeRoot(req.params.trunkId, req.params.rootId);
        }
    )
);

router.get('/api/search/:namepart',
    [
        check('namepart').exists()
    ],
    json(async (req) => {
            validationResult(req).throw();
            return trunks.search(req.params.namepart);
        }
    )
);

router.get('/api/all',
    json(async () => {
            return headers.all();
        }
    )
);

router.get('/api/trunk/:id',
    [
        check('id').exists().isMongoId(),
    ],
    json(async (req) => {
            validationResult(req).throw();
            return trunks.get(req.params.id);
        }
    )
);

router.get('/api/trunk/:id/:qt',
    [
        check('id').exists().isMongoId(),
        check('qt').exists().isInt(),
    ],
    json(async (req) => {
            validationResult(req).throw();
            const idQt = matchedData(req);
            const unit = "";
            return trunks.getWithQtUnit(idQt.id, idQt.qt, unit);
        }
    )
);

router.get('/api/trunk/:id/:qt/:unit',
    [
        check('id').exists().isMongoId(),
        check('qt').exists().isInt(),
        check('unit').exists().isIn(units.shortNames())
    ],

    json(async (req) => {
            validationResult(req).throw();
            const idQtUnit = matchedData(req);
        return trunks.getWithQtUnit(idQtUnit.id, idQtUnit.qt, idQtUnit.unit);
        }
    )
);
