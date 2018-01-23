import {validId} from "../../const/validations";

const run = require('../../util/run');
const router = require('express').Router();
const {check} = require('express-validator/check');
const trunks = require('../../service/trunks');

module.exports = router;

router.put('/api/trunk/:_id',
    [
        validId,
        check('name', 'name is mandatory').exists().matches(/^.+/)
    ],
    run(trunks.updateName)
);