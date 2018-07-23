import {existingId, validId, validQ, validQt, validT, validUnit} from "../../const/validations";
import {getQuantifiedTrunk, getTrunk, search} from "../../service/trunk/getTrunkService";

import {run} from '../../util/run'
import {QT, UNIT} from "../../const/paths";

const router = require('express').Router();
const {check} = require('express-validator/check');

module.exports = router;

router.get('/api/trunks',
    validQ,
    validT,
    run(({q, t}) => search(q, t))
);

router.get('/api/trunk/:_id',
    existingId,
    run(({_id}) => getTrunk(_id))
);

router.get('/api/trunk/:qt/:unit/:_id',
    validId,
    validQt(QT),
    validUnit(UNIT),
    run(({qt, unit, _id}) => getQuantifiedTrunk(qt, unit, _id))
);