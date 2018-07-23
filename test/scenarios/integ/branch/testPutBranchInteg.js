import {app} from "../../../../src";
import {assertDb} from "trees-test/dist/db";
import {init, request} from "trees-test/dist/api";
import {setQuantityBranchSpec, updateQuantityAnotherUnitBranchSpec, updateQuantityBranchSpec} from "../../../spec/branch/testPutBranchSpec";
import {run} from "trees-test/dist/api";
import api from "../../../../src";
import ENV from "../../../../src/env";
import {cols} from "../../../../src/const/collections";

describe('PUT Branch', function () {

    beforeEach(init(api, ENV, cols));

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