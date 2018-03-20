import {run} from "../../../util/testIntegUtil";
import {assertDb} from "../../../util/testIntegDatabase";
import {setQuantityLinkSpec, updateQuantityAnotherUnitLinkSpec, updateQuantityLinkSpec} from "../../../expected/link/testPutLinkData";
import {init, request} from "../../../util/testIntegUtil";

describe('PUT Link', function () {

    beforeEach(init);

    it('set quantity', run(() => putLink(setQuantityLinkSpec)));
    it('update quantity', run(() => putLink(updateQuantityLinkSpec)));
    it('update quantity with another unit', run(() => putLink(updateQuantityAnotherUnitLinkSpec)));
});

export const putLink = testDef => request()
    .put('/api/link')
    .send(testDef.req.body)
    .then(async (res) => {
        res.should.have.status(200);
        await assertDb(testDef.db.expected);
        res.body.should.deep.equal(testDef.res.body);
    });