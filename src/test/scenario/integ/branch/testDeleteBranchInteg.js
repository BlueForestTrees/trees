import chai from 'chai';
import {app} from "../../../../main";
import {assertDb, initDatabase} from "../../../testIntegDatabase";
import {branchDeletionSpec} from "../../../expected/branch/testDeleteBranchData";
import {run} from "../testIntegPlumbing";

describe('DELETE branch', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    it('delete the branch', run(() => deleteBranch(branchDeletionSpec)));

});

export const deleteBranch = branchDeletion => chai.request(app)
    .del(`/api/branch/${branchDeletion.req.trunkId}/${branchDeletion.req.branchId}`)
    .then(async res => {
        res.should.have.status(200);
        res.body.should.deep.equal(branchDeletion.res.expected);
        await assertDb(branchDeletion.db.expected);
    });
