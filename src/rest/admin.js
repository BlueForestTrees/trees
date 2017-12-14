const run = require('./util/run');
const router = require('express').Router();
const headers = require('../service/headers');
const trunks = require('../service/trunks');

module.exports = router;

router.get('/api/all',
    run(headers.all)
);

router.post('/api/purge',
    run(trunks.purge)
);