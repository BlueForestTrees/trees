import chai from 'chai';
import {match, mock} from 'sinon';

import {assertDb, initDatabase, run} from "../testIntegPlumbing";
import {app} from "../../../../main";
import {existingsAndUnitChange, existingIdsNewQts, existingIdsAndQts} from "../../../expected/root/testPutRootData";

describe('PUT Root', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    it('existingIdsNewQts', run(() => putRoot(existingIdsNewQts)));
    it('existingIdsAndQts', run(() => putRoot(existingIdsAndQts)));
    it('differentUnit', run(() => putRoot(existingsAndUnitChange)));
});

export const putRoot = testDef => chai.request(app)
    .put('/api/root')
    .send(testDef.req.body)
    .then(async (res) => {
        res.should.have.status(200);
        await assertDb(testDef.db.expected);
        res.body.should.deep.equal(testDef.res.body);
    });