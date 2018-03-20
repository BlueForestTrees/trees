import {bleAddingImpactSpec, bleAddingImpactSpec2, bleUpdatingImpactSpec, farineCreatingImpactSpec} from "../../../expected/impact/testPostImpactData";
import {assertDb} from "../../../util/testIntegDatabase";
import {init, request} from "../../../util/testIntegApp";

const by = spec => done => {
    request()
        .post(`/api/impact`)
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

    it('create impacts to farine', by(farineCreatingImpactSpec));
    it('adding impact to ble', by(bleAddingImpactSpec));
    it('adding impact to ble different trunk qt', by(bleAddingImpactSpec2));
    it('update impact of ble', by(bleUpdatingImpactSpec));
});