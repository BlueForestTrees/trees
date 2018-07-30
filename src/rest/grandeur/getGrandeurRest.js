import {getGrandeurs} from "trees-units";

import {Router} from "trees-express";
const router = Router();
import {run} from 'trees-express'

router.get('/api/grandeurs',
    run(getGrandeurs)
);

module.exports = router;