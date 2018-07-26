import {app} from "../../../../main";
import {assertDb} from "../../../util/testIntegDatabase";import {init, request} from "../../../util/testIntegApp";
import {setQuantityBranchSpec, updateQuantityAnotherUnitBranchSpec, updateQuantityBranchSpec} from "../../../spec/branch/testPutBranchSpec";
import {run} from "../../../util/testIntegApp";

describe('PUT Branch', function () {

    beforeEach(init);

    it('set quantity', run(() => putBranch(setQuantityBranchSpec)));
    it('update quantity', run(() => putBranch(updateQuantityBranchSpec)));
    it('differentUnit', run(() => putBranch(updateQuantityAnotherUnitBranchSpec)));
});

export const putBranch = testDef => request()
    .put('/api/branch')
    .send(testDef.req.body)
    .then(async (res) => {
        res.should.have.status(200);
        await assertDb(testDef.db.expected);
        res.body.should.deep.equal(testDef.res.body);
    });