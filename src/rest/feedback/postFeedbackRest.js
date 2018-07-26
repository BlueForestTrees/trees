import {run} from '../../util/run'

import {Router} from "express";
import {addFeedback} from "../../service/feedback/postFeedbackService";
import {validMail, validMessage} from "../../const/validations";
const router = Router();

module.exports = router;

router.post('/api/feedback',
    validMail,
    validMessage,
    run(addFeedback)
);