import {optionalValidQt, optionalValidUnit, validId, validQt, validUnit} from "../../const/validations";
import {loadNamedQuantifiedRoot, loadNamedUnquantifiedRoot} from "../../topService/getRootTopService";
import {QT, UNIT} from "../../const/paths";
import {readRootTree} from "../../service/root/getRootService";

const run = require('../../util/run');
const router = require('express').Router();

module.exports = router;

router.get('/api/root/:_id',
    [
        validId
    ],
    run(({_id}) => loadNamedUnquantifiedRoot(_id))
);

router.get('/api/root/:qt/:unit/:_id',
    [
        validId,
        validQt(QT),
        validUnit(UNIT)
    ],
    run(({qt, unit, _id}) => loadNamedQuantifiedRoot(qt, unit, _id))
);

router.get('/api/root/tree/:qt/:unit/:_id',
    [
        validId,
        validQt(QT),
        validUnit(UNIT)
    ],
    run(({qt, unit, _id}) => readRootTree(qt, unit, _id))
);