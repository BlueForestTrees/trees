import {impactDeletionSpec} from "../../../expected/impact/testDeleteImpactData";
import {app} from "../../../../main";
import {assertDb} from "../../../util/testIntegDatabase";import {init, request} from "../../../util/testIntegApp";

describe('DELETE Impact', function () {

    beforeEach(init);

    it('delete the impact', done => {
        request()
            .post(`/api/impact/deletion`)
            .send(impactDeletionSpec.req.body)
            .then(async res => {
                res.should.have.status(200);
                res.body.should.deep.equal(impactDeletionSpec.res.expected);
                await assertDb(impactDeletionSpec.db.expected);
                done();
            })
            .catch(function (err) {
                done(err);
            });
    });

});