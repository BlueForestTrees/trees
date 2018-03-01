import {initDatabase} from "../../../testIntegDatabase";
import {farineBranchDeletionSpec} from "../../../expected/branch/testDeleteBranchData";
import {farineToBleBranchAddSpec} from "../../../expected/branch/testPostBranchData";
import {deleteBranch} from "./testDeleteBranchInteg";
import {postBranch} from "./testPostBranchInteg";
import {run} from "../testIntegPlumbing";

describe('SCENARIO Branch', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    it('suppr puis réajout de la farine au blé',
        run(() => deleteBranch(farineBranchDeletionSpec)
            .then(
                () => postBranch(farineToBleBranchAddSpec))
        ));
});

