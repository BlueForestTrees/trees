import {setImpact} from "../../service/impact/postImpactService";
import {valid, validItem} from "../../const/validations";

const run = require('../../util/run');
const router = require('express').Router();

module.exports = router;

router.post('/api/impact/:treeId',
    [
        valid("treeId"),
        ...validItem('impact')
    ],
    run(setImpact)
);