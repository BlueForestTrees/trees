import {validId, validQt, validUnit} from "../../const/validations";
import {QT, UNIT} from "../../const/paths";
import {getTank} from "../../topService/getTankTopService";

import {run} from '../../util/run'
const router = require('express').Router();

module.exports = router;

router.get('/api/tank/:qt/:unit/:_id',
    [
        validId,
        validQt(QT),
        validUnit(UNIT)
    ],
    run(({qt, unit, _id}) => getTank(qt, unit, _id))
);