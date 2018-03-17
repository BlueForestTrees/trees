import {validId} from "../../const/validations";
import {purgeTrunks, remove} from "../../service/trunk/deleteTrunkService";

import {run} from '../../util/run'
import express from 'express';
const router = express.Router();

module.exports = router;

router.delete('/api/trunk/:_id',
    [
        validId
    ],
    run(({_id})=>remove(_id))
);

router.delete('/api/trunks', run(purgeTrunks));

