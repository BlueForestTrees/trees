import {farineBranchDeletionSpec} from "../../../expected/branch/testDeleteBranchData";
import {farineToBleBranchAddSpec} from "../../../expected/branch/testPostBranchData";
import {deleteBranch} from "./testDeleteBranchInteg";
import {postBranch} from "./testPostBranchInteg";
import {run} from "../../../util/testIntegUtil";
import {init} from "../../../util/testIntegUtil";

describe('SCENARIO Branch', function () {

    beforeEach(init);

    it('suppr puis réajout de la farine au blé',
        run(() => deleteBranch(farineBranchDeletionSpec)
            .then(
                () => postBranch(farineToBleBranchAddSpec))
        ));
});

