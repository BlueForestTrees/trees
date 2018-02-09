import {existingId, validQt, validUnit} from "../../const/validations";
import {QT, UNIT} from "../../const/paths";
import {getTank} from "../../topService/getTankTopService";

const run = require('../../util/run');
const router = require('express').Router();

module.exports = router;

router.get('/api/tank/:qt/:_id',
    [
        existingId,
        validQt(QT)
    ],
    run(({qt, _id}) => getTank(qt, "", _id))
);

router.get('/api/tank/:qt/:unit/:_id',
    [
        existingId,
        validQt(QT),
        validUnit(UNIT)
    ],
    run(({qt, unit, _id}) => getTank(qt, unit, _id))
);
