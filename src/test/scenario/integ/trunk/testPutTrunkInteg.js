import {trunkRename, trunkRequantify} from "../../../expected/trunk/testPutTrunkData";
import chai from 'chai';
import {assertDb, initDatabase} from "../testIntegPlumbing";
import {app} from "../../../../main";

describe('PUT Trunks', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    it('rename the trunk', done => testPutTrunkWith(trunkRename, done));
    it('quantify the trunk', done => testPutTrunkWith(trunkRequantify, done));

});

const testPutTrunkWith = (spec,done) => {
    chai.request(app)
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
};