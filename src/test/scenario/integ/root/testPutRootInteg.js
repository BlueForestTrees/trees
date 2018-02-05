import chai from 'chai';
import {match, mock} from 'sinon';

import {assertDb, initDatabase} from "../testIntegPlumbing";
import {app} from "../../../../main";
import {existingsAndUnitChange, existingIdsNewQts, existingIdsAndQts} from "../../../expected/root/testPutRootData";

describe('PUT Root', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    it('idsAndQts', done => testPutRootWith(existingIdsNewQts, done));
    it('updatingTrunkQt', done => testPutRootWith(existingIdsAndQts, done));
    it('differentUnit', done => testPutRootWith(existingsAndUnitChange, done));
});

const testPutRootWith = (testDef, done) => {
    chai.request(app)
        .put('/api/root')
        .send(testDef.req.body)
        .then(async (res) => {
            res.should.have.status(200);
            res.body.should.deep.equal(testDef.res.body);
            await assertDb(testDef.db.expected);
            done();
        })
        .catch(function (err) {
            done(err);
        });
};