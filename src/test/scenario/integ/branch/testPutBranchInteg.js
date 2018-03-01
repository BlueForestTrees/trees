import chai from 'chai';
import {app} from "../../../../main";
import {assertDb, initDatabase} from "../../../testIntegDatabase";
import {updateQuantityBranchSpec, setQuantityBranchSpec, updateQuantityAnotherUnitBranchSpec} from "../../../expected/branch/testPutBranchData";
import {run} from "../testIntegPlumbing";

describe('PUT Branch', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    it('set quantity', run(() => putBranch(setQuantityBranchSpec)));
    it('update quantity', run(() => putBranch(updateQuantityBranchSpec)));
    it('differentUnit', run(() => putBranch(updateQuantityAnotherUnitBranchSpec)));
});

export const putBranch = testDef => chai.request(app)
    .put('/api/branch')
    .send(testDef.req.body)
    .then(async (res) => {
        res.should.have.status(200);
        await assertDb(testDef.db.expected);
        res.body.should.deep.equal(testDef.res.body);
    });