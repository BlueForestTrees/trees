import {rename} from "../../../expected/trunk/testPutTrunkData";
import chai from 'chai';
import server from '../../../../src/index';
import {assertDb, initDatabase} from "../testIntegPlumbing";
import {quantify} from "../../../expected/trunk/testPutQuantityData";

describe('PUT Trunks', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    it('rename the trunk', done => testPutTrunkWith(rename, done));
    it('quantify the trunk', done => testPutTrunkWith(quantify, done));

});

const testPutTrunkWith = (spec,done) => {
    chai.request(server)
        .put(`/api/trunk/${spec.req.params._id}`)
        .send(spec.req.body)
        .then(async res => {
            res.should.have.status(200);
            res.body.should.deep.equal(spec.res.body);
            await assertDb(spec.db.expected);
            done();
        })
        .catch(function (err) {
            done(err);
        });
}