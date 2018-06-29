import {run} from '../../util/run'
import {validPassword, validLogin} from "../../const/validations";
import {suscribe} from "../../service/auth/authService";

const router = require('express').Router();

module.exports = router;

router.post('/api/suscribe',
    validLogin,
    validPassword,
    run(suscribe)
);