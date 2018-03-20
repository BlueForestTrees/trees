import {app} from "../../../../main";

import {init, request, run} from "../../../util/testIntegApp";
import {setQuantityRootSpec, updateQuantityAnotherUnitRootSpec, updateQuantityRootSpec} from "../../../expected/root/testPutRootData";
import {assertDb} from "../../../util/testIntegDatabase";

describe('PUT Root', function () {

    beforeEach(init);

    it('set quantity', run(() => putRoot(setQuantityRootSpec)));
    it('update quantity', run(() => putRoot(updateQuantityRootSpec)));
    it('update quantity with another unit', run(() => putRoot(updateQuantityAnotherUnitRootSpec)));
});

export const putRoot = testDef => request()
    .put('/api/root')
    .send(testDef.req.body)
    .then(async (res) => {
        res.should.have.status(200);
        await assertDb(testDef.db.expected);
        res.body.should.deep.equal(testDef.res.body);
    });