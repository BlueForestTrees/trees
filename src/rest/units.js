const express = require('express');
const router = express.Router();
const json = require('./util/run');
const units = require('../service/units');

router.get('/api/grandeurs', json(async () => {
    return units.grandeurs;
}));

module.exports = router;