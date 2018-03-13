import {setImpact} from "../../service/impact/postImpactService";
import {validItem} from "../../const/validations";

const run = require('../../util/run');
const router = require('express').Router();

module.exports = router;

router.post('/api/impact',
    [
        ...validItem('trunk'),
        ...validItem('impact')
    ],
    run(setImpact)
);