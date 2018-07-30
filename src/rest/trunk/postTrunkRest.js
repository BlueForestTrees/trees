import {create} from "../../service/trunk/postTrunkService";

import {run} from 'trees-express'
import {validColor, validId, validName, validType} from "../../const/validations";

import {Router} from "trees-express"; const router = Router();

module.exports = router;

router.post('/api/trunk',
    validId,
    validColor,
    validName,
    validType,
    run(create)
);