import chai from 'chai';
import {match, mock} from 'sinon';

import {app} from "../../../../main";

import {run} from "../../../testPlumbing";
import {updateQuantityRootSpec, setQuantityRootSpec, updateQuantityAnotherUnitRootSpec} from "../../../expected/root/testPutRootData";
import {assertDb, initDatabase} from "../../../testIntegDatabase";
import {setQuantityLinkSpec, updateQuantityAnotherUnitLinkSpec, updateQuantityLinkSpec} from "../../../expected/link/testPutLinkData";

describe('PUT Link', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    it('set quantity', run(() => putLink(setQuantityLinkSpec)));
    it('update quantity', run(() => putLink(updateQuantityLinkSpec)));
    it('update quantity with another unit', run(() => putLink(updateQuantityAnotherUnitLinkSpec)));
});

export const putLink = testDef => chai.request(app)
    .put('/api/link')
    .send(testDef.req.body)
    .then(async (res) => {
        res.should.have.status(200);
        await assertDb(testDef.db.expected);
        res.body.should.deep.equal(testDef.res.body);
    });