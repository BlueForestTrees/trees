import {validId} from "../../const/validations";

const run = require('../../util/run');
const express = require('express');
const router = express.Router();
const trunks = require('../../service/trunks');

module.exports = router;

router.delete('/api/trunk/:id',
    [
        validId
    ],
    run(({id})=>trunks.remove(id))
);

router.delete('/api/trunks', run(trunks.purge));

