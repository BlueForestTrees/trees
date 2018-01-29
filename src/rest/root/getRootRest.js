import {existingId} from "../../const/validations";
import {loadRoots} from "../../topService/getRootTopService";

const run = require('../../util/run');
const router = require('express').Router();

module.exports = router;

router.get('/api/root/:_id',
    [
        existingId
    ],
    run(({_id}) => loadRoots(_id))
);