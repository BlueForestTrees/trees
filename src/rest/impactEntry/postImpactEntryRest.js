import {addImpactEntry} from "../../service/impactEntry/postImpactEntryService";
import {validColor, validGrandeur, validId, validName} from "../../const/validations";
import {run} from '../../util/run'

import {Router} from "trees-express";
const router = Router();

module.exports = router;

router.post('/api/impactEntry',
    validId,
    validName,
    validGrandeur,
    validColor,
    run(addImpactEntry)
);