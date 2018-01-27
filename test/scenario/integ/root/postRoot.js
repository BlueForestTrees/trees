import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
import {match, mock} from 'sinon';

import {assertDb, initDatabase} from "../../../common/index";
import server from '../../../../src/index';
import {definingBothQt, differentUnit, justIds, updatingTrunkQt} from "../../../expected/putRoot";

process.env.NODE_ENV = 'test';
process.env.PORT = 8081;

chai.use(chaiHttp);
chai.should();

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
    chai.request(server)
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

//TODO un test qui valide le update de la collection trunks quand le parent n'a pas de quantité