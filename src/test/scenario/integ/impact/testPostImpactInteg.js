import {bleAddingImpactSpec, bleUpdatingImpactSpec, farineCreatingImpactSpec} from "../../../expected/impact/testPostImpactData";
import {assertDb} from "../../../util/testIntegDatabase";
import {init, request} from "../../../util/testIntegApp";


const by = spec => done => {
    request()
        .post(`/api/impact/${spec.req._id}`)
        .send(spec.req.body)
        .then(async (res) => {
            res.should.have.status(200);
            res.body.should.deep.equal(spec.res.body);
            await assertDb(spec.db.expected);
            done();
        })
        .catch(function (err) {
            done(err);
        });
};

describe('POST Impact', function () {

    beforeEach(init);

    it('create farine impacts', by(farineCreatingImpactSpec));
    it('firstImpact', by(farineCreatingImpactSpec));
    it('thirdImpact', by(bleAddingImpactSpec));
    it('updatingImpact', by(bleUpdatingImpactSpec));
});