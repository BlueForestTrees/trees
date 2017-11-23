const json = require('./util/json');
const express = require('express');
const router = express.Router();
const db = require('../repo/db');

router.get('/adminapi/all', json(async () => {
    return (await db).collection('Trees').find().toArray();
}));

router.get('/adminapi/purge', json(async () => {
    return (await db).collection('Trees').deleteMany();
}));

module.exports = router;