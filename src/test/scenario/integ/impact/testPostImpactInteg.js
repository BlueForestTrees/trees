import {firstImpactSpec, thirdImpact, updatingBleImpactSpec} from "../../../expected/impact/testPostImpactData";
import {app} from "../../../../main";
import {assertDb} from "../../../util/testIntegDatabase";import {init, request} from "../../../util/testIntegApp";

describe('POST Impact', function () {

    beforeEach(init);

    it('firstImpact', done => testPostImpactWith(firstImpactSpec, done));
    it('thirdImpact', done => testPostImpactWith(thirdImpact, done));
    it('updatingImpact', done => testPostImpactWith(updatingBleImpactSpec, done));
});

const testPostImpactWith = (testDef, done) => {
    request()
        .post(`/api/impact/${testDef.req._id}`)
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