import {init, withTest} from "../../../util/testIntegApp";
import {branchDeletionSpec} from "../../../spec/branch/testDeleteBranchSpec";


describe('DELETE branch', function () {

    beforeEach(init);

    it('delete the branch', withTest(branchDeletionSpec));

});