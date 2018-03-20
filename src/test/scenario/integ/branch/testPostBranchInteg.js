import {assertDb} from "../../../util/testIntegDatabase";
import {existingBranchPostSpec, newBranchSpec} from "../../../expected/branch/testPostBranchData";
import {run} from "../../../util/testIntegUtil";
import {init, request} from "../../../util/testIntegUtil";

describe('POST Branch', function () {

    beforeEach(init);

    it('newBranch', run(() => postBranch(newBranchSpec)));

    it('existing branch', run(() => postBranch(existingBranchPostSpec)));
});

export const postBranch = spec => request()
    .post('/api/branch')
    .send(spec.req.body)
    .then(async res => {
        res.should.have.status(200);
        await assertDb(spec.db.expected);
        res.body.should.deep.equal(spec.res.body);
    });