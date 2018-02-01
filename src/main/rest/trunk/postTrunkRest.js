import {EITHER_OR} from "../../const/messages";
import {optionalExistingSourceId, optionalValidName} from "../../const/validations";
import {runraw} from "../../util/runraw";
import {createOrClone, putall} from "../../service/trunk/postTrunkService";

const run = require('../../util/run');
const router = require('express').Router();
const {check, oneOf} = require('express-validator/check');

module.exports = router;

router.post('/api/trunks/all',
    runraw(putall)
);

router.post('/api/trunk',
    [
        optionalValidName,
        optionalExistingSourceId,

        oneOf([
            [check('name').exists(), check('sourceId').not().exists()],
            [check('name').not().exists(), check('sourceId').exists()]
        ],EITHER_OR)
    ],
    run(createOrClone)
);