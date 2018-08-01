import {run} from 'express-blueforest'
import {validPassword, validMail, validWelcomeToken, validFullname} from "../../const/validations"
import {authenticate, confirmSuscribe, startSuscribe} from "../../service/auth/authService"
import {Router} from "express-blueforest"
const router = Router()

module.exports = router

router.post('/api/mail',
    validMail,
    run(startSuscribe)
)

router.post('/api/confirm',
    validWelcomeToken,
    validFullname,
    validPassword,
    run(confirmSuscribe)
)

router.post('/api/auth',
    validMail,
    validPassword,
    run(authenticate)
)