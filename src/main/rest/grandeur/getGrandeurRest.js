import {grandeurs} from "../../service/grandeur/grandeursService";

const express = require('express');
const router = express.Router();
const run = require('../../util/run');

router.get('/api/grandeurs',
    run(() => grandeurs)
);

module.exports = router;