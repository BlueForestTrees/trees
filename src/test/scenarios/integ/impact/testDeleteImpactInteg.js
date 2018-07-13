import {impactDeletionSpec} from "../../../spec/impact/testDeleteImpactSpec";
import {assertDb} from "../../../util/testIntegDatabase";
import {init, request} from "../../../util/testIntegApp";

const by = spec => done => {
    request()
        .post(`/api/impact/deletion`)
        .send(spec.req.body)
        .then(async (res) => {
            res.should.have.status(200);
            res.body.should.deep.equal(spec.res.expected);
            await assertDb(spec.db.expected);
            done();
        })
        .catch(function (err) {
            done(err);
        });
};

describe('DELETE Impact', function () {

    beforeEach(init);

    it('delete the impact', by(impactDeletionSpec));

});