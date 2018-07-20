import {create} from "../../service/trunk/postTrunkService";

import {run} from '../../util/run'
import {validColor, validName, validType} from "../../const/validations";

const router = require('express').Router();

module.exports = router;

router.post('/api/trunk',
    validColor,
    validName,
    validType,
    run(create)
);