const express = require('express');
const router = express.Router();
const json = require('../../util/run');
const {grandeurs} = require('../../service/grandeurs');

router.get('/api/grandeurs', json(async () => {
    return grandeurs;
}));

module.exports = router;