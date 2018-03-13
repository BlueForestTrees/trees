import {getGrandeurs} from "trees-common/dist";

const express = require('express');
const router = express.Router();
const run = require('../../util/run');

router.get('/api/grandeurs',
    run(getGrandeurs)
);

module.exports = router;