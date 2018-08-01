import {run} from 'express-blueforest'

import {Router} from "express-blueforest"
import {addFeedback} from "../../service/feedback/postFeedbackService"
import {validMail, validMessage} from "../../const/validations"
const router = Router()

module.exports = router

router.post('/api/feedback',
    validMail,
    validMessage,
    run(addFeedback)
)