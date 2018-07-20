import {deleteBleBranchFarineSpec} from "../../../spec/branch/testDeleteBranchSpec";
import {farineToBleBranchAddSpec} from "../../../spec/branch/testPostBranchSpec";
import {deleteBranch} from "./testDeleteBranchInteg";
import {postBranch} from "./testPostBranchInteg";
import {run, withTest} from "../../../util/testIntegApp";
import {init} from "../../../util/testIntegApp";

describe('SCENARIO Branch', function () {

    beforeEach(init);

    it('suppr puis réajout de la farine au blé',
        withTest([
            deleteBleBranchFarineSpec,
            farineToBleBranchAddSpec
        ])
    );
});

