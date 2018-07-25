import {validId, validQt, validUnit} from "../../const/validations";
import {QT, UNIT} from "../../const/paths";

import {run} from '../../util/run'
import {loadImpact, loadQuantifiedImpacts} from "../../service/impact/getImpactService";
const router = require('express').Router();

module.exports = router;

router.get('/api/impact/:_id',
    validId,
    run(({_id}) => loadImpact(_id))
);

router.get('/api/impact/:qt/:unit/:_id',
    validId,
    validQt(QT),
    validUnit(UNIT),
    run(({qt, unit, _id}) => loadQuantifiedImpacts({qt, unit}, _id))
);