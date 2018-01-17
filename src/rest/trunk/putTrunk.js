const run = require('../../util/run');
const _ = require('lodash');
const router = require('express').Router();
const {check} = require('express-validator/check');
const units = require('../../service/grandeurs');
const trunks = require('../../service/trunks');

module.exports = router;

router.put('/api/trunk/:_id',
    [
        check('_id', '_id is mandatory').exists().isMongoId(),
        check('name', 'name is mandatory').exists().matches(/^.+/)
    ],
    run(trunks.updateName)
);