const run = require('../../util/run');
const express = require('express');
const router = express.Router();
const {check} = require('express-validator/check');
const trunks = require('../../service/trunks');

module.exports = router;

router.delete('/api/trunk/:id',
    [
        check('id').exists().isMongoId(),
    ],
    run(({id})=>trunks.remove(id))
);

router.delete('/api/root/:trunkId/:rootId',
    [
        check('trunkId').exists().isMongoId(),
        check('rootId').exists().isMongoId()
    ],
    run(trunks.removeRoot)
);

router.delete('/api/trunks', run(trunks.purge));

