import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
import {match, mock} from 'sinon';

import {assertDb, initDatabase} from "../../common/index";
import server from '../../../src/index';
import {definingBothQt, differentUnit, justIds, updatingTrunkQt} from "../../expected/putRoot";

process.env.NODE_ENV = 'test';
process.env.PORT = 8081;

chai.use(chaiHttp);
chai.should();

describe('Roots', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    describe('/PUT root', () => {
        it('justIds', done => testPutRootWith(justIds, done));
        it('definingBothQt', done => testPutRootWith(definingBothQt, done));
        it('updatingTrunkQt', done => testPutRootWith(updatingTrunkQt, done));
        it('differentUnit', done => testPutRootWith(differentUnit, done));
    });
});

const testPutRootWith = (testDef, done) => {
    chai.request(server)
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