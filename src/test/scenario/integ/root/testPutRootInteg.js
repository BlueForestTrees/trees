import chai from 'chai';
import {match, mock} from 'sinon';

import {assertDb, initDatabase, run} from "../testIntegPlumbing";
import {app} from "../../../../main";
import {existingsAndUnitChangeSpec, existingIdsNewQtsSpec, existingIdsAndQtsSpec} from "../../../expected/root/testPutRootData";

describe('PUT Root', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    it('existingIdsNewQts', run(() => putRoot(existingIdsNewQtsSpec)));
    it('existingIdsAndQts', run(() => putRoot(existingIdsAndQtsSpec)));
    it('differentUnit', run(() => putRoot(existingsAndUnitChangeSpec)));
});

export const putRoot = testDef => chai.request(app)
    .put('/api/root')
    .send(testDef.req.body)
    .then(async (res) => {
        res.should.have.status(200);
        await assertDb(testDef.db.expected);
        res.body.should.deep.equal(testDef.res.body);
    });