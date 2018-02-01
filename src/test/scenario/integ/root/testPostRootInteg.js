import chai from 'chai';
import {match, mock} from 'sinon';

import {definingBothQt, differentUnit, justIds, updatingTrunkQt} from "../../../expected/root/testPostRootData";
import {assertDb, initDatabase} from "../testIntegPlumbing";
import {app} from "../../../../main";

describe('POST Root', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    it('justIds', done => testPostRootWith(justIds, done));
    it('definingBothQt', done => testPostRootWith(definingBothQt, done));
    it('updatingTrunkQt', done => testPostRootWith(updatingTrunkQt, done));
    it('differentUnit', done => testPostRootWith(differentUnit, done));
});

const testPostRootWith = (testDef, done) => {
    chai.request(app)
        .post('/api/root')
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