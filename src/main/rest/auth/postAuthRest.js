import {run} from '../../util/run'
import {validPassword, validLogin} from "../../const/validations";
import {authenticate} from "../../service/auth/authService";
const router = require('express').Router();

module.exports = router;

router.post('/api/auth',
    validLogin,
    validPassword,
    run(authenticate)
);