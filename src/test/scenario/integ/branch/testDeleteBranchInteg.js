import {assertDb} from "../../../util/testIntegDatabase";
import {init, request} from "../../../util/testIntegApp";
import {branchDeletionSpec} from "../../../expected/branch/testDeleteBranchData";
import {run} from "../testIntegPlumbing";

describe('DELETE branch', function () {

    beforeEach(init);

    it('delete the branch', run(() => deleteBranch(branchDeletionSpec)));

});

export const deleteBranch = branchDeletion =>
    request()
        .del(`/api/branch/${branchDeletion.req.trunkId}/${branchDeletion.req.branchId}`)
        .then(async res => {
            res.should.have.status(200);
            res.body.should.deep.equal(branchDeletion.res.expected);
            await assertDb(branchDeletion.db.expected);
        });
