import {validId} from "../../const/validations";
import {loadImpacts} from "../../topService/getImpactTopService";

const run = require('../../util/run');
const router = require('express').Router();

module.exports = router;

router.get('/api/impact/:_id',
    [
        validId
    ],
    run(({_id}) => loadImpacts(_id))
);