import {create, putall} from "../../service/trunk/postTrunkService";

import {run} from '../../util/run'
import {validColor, validGrandeur, validName} from "../../const/validations";

const router = require('express').Router();

module.exports = router;

router.post('/api/trunk',
    validColor,
    validName,
    validGrandeur,
    run(create)
);