import {existingId, optionalValidQt, optionalValidUnit} from "../../const/validations";
import {loadQuantifiedRoot, loadUnquantifiedRoot} from "../../topService/getRootTopService";
import {QT, UNIT} from "../../const/paths";

const run = require('../../util/run');
const router = require('express').Router();

module.exports = router;

router.get('/api/root/:_id',
    [
        existingId
    ],
    run(({_id}) => loadUnquantifiedRoot(_id))
);

router.get('/api/root/:qt/:_id',
    [
        existingId,
        optionalValidQt(QT)
    ],
    run(({qt, _id}) => loadQuantifiedRoot(qt, "", _id))
);

router.get('/api/root/:qt/:unit/:_id',
    [
        existingId,
        optionalValidQt(QT),
        optionalValidUnit(UNIT)
    ],
    run(({qt, unit, _id}) => loadQuantifiedRoot(qt, unit, _id))
);
