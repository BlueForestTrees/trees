import {validId, validQt, validUnit} from "../../const/validations";
import {QT, UNIT} from "../../const/paths";

import {run} from 'trees-express'
import {loadNamedQuantifiedBranch, loadNamedUnquantifiedBranch, readBranchTree} from "../../service/branch/branchService";
import {Router} from "trees-express"; const router = Router();

module.exports = router;

router.get('/api/branch/:_id',
    validId,
    run(({_id}) => loadNamedUnquantifiedBranch(_id))
);

router.get('/api/branch/:qt/:unit/:_id',
    validId,
    validQt(QT),
    validUnit(UNIT),
    run(({qt, unit, _id}) => loadNamedQuantifiedBranch(qt, unit, _id))
);

router.get('/api/branch/tree/:qt/:unit/:_id',
    validId,
    validQt(QT),
    validUnit(UNIT),
    run(({qt, unit, _id}) => readBranchTree(qt, unit, _id))
);