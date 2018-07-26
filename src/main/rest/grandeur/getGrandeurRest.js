import {getGrandeurs} from "trees-units";

import express from "trees-express";
const router = express.Router();
import {run} from '../../util/run'

router.get('/api/grandeurs',
    run(getGrandeurs)
);

module.exports = router;