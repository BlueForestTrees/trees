import {run} from '../../util/run'
import {validPassword, validMail, validWelcomeToken, validFullname, validPseudo} from "../../const/validations";
import {authenticate, confirmSuscribe, startSuscribe} from "../../service/auth/authService";
const router = require('express').Router();

module.exports = router;

router.post('/api/mail',
    validMail,
    run(startSuscribe)
);

router.post('/api/confirm',
    validWelcomeToken,
    validFullname,
    validPseudo,
    validPassword,
    run(confirmSuscribe)
);

router.post('/api/auth',
    validMail,
    validPassword,
    run(authenticate)
);