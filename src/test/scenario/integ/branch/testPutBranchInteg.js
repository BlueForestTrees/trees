import chai from 'chai';
import {match, mock} from 'sinon';

import {app} from "../../../../main";

import {run} from "../../../testPlumbing";
import {existingIdsAndQtsSpec, existingIdsNewQtsSpec, existingsAndUnitChangeSpec} from "../../../expected/root/testPutRootData";
import {assertDb, initDatabase} from "../../../testIntegDatabase";

describe('PUT Root', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    // it('existingIdsNewQts', run(() => putRoot(existingIdsNewQtsSpec)));
    // it('existingIdsAndQts', run(() => putRoot(existingIdsAndQtsSpec)));
    // it('differentUnit', run(() => putRoot(existingsAndUnitChangeSpec)));
});

export const putRoot = testDef => chai.request(app)
    .put('/api/root')
    .send(testDef.req.body)
    .then(async (res) => {
        res.should.have.status(200);
        await assertDb(testDef.db.expected);
        res.body.should.deep.equal(testDef.res.body);
    });