import {branchIdIsNotTrunkId, validBranchId, validTrunkId} from "../../const/validations";
import configure from "trees-items-service";
import {cols} from "../../const/collections";
import {col} from "trees-db-version/dist";

import {run} from 'trees-express'
import {Router} from "trees-express"; const router = Router();

const insertBranch = configure(() => col(cols.BRANCH)).insertItem;

module.exports = router;

router.post('/api/branch',
    [
        validTrunkId,
        validBranchId,
        branchIdIsNotTrunkId
    ],
    run(({trunk, branch}) => insertBranch(trunk, branch))
);