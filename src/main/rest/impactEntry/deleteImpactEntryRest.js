import {purgeImpactsEntries} from "../../service/impactEntry/deleteImpactEntriesService";

const run = require('../../util/run');
const express = require('express');
const router = express.Router();

module.exports = router;

router.delete('/api/impactEntry', run(purgeImpactsEntries));


