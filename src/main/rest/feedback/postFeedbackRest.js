import {run} from '../../util/run'

import express from "trees-express";
import {addFeedback} from "../../service/feedback/postFeedbackService";
import {validMail, validMessage} from "../../const/validations";
const router = express.Router();

module.exports = router;

router.post('/api/feedback',
    validMail,
    validMessage,
    run(addFeedback)
);