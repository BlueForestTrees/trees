import {run} from '../../util/run'
import {validPassword, validUsername} from "../../const/validations";
import {authenticate} from "../../service/auth/authService";
const router = require('express').Router();

module.exports = router;

router.post('/api/authenticate',
    [
        validUsername,
        validPassword,
    ],
    run(authenticate)
);