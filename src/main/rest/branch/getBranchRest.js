import {validId, validQt, validUnit} from "../../const/validations";
import {loadNamedQuantifiedBranch, loadNamedUnquantifiedBranch} from "../../topService/getBranchTopService";
import {QT, UNIT} from "../../const/paths";
import {readBranchTree} from "../../service/branch/branchQueries";

import {run} from '../../util/run'
const router = require('express').Router();

module.exports = router;

router.get('/api/branch/:_id',
    [
        validId
    ],
    run(({_id}) => loadNamedUnquantifiedBranch(_id))
);

router.get('/api/branch/:qt/:unit/:_id',
    [
        validId,
        validQt(QT),
        validUnit(UNIT)
    ],
    run(({qt, unit, _id}) => loadNamedQuantifiedBranch(qt, unit, _id))
);

router.get('/api/branch/tree/:qt/:unit/:_id',
    [
        validId,
        validQt(QT),
        validUnit(UNIT)
    ],
    run(({qt, unit, _id}) => readBranchTree(qt, unit, _id))
);