import chai from 'chai';

import {impactDeletionSpec} from "../../../expected/impact/testDeleteImpactData";
import {app} from "../../../../main";
import {assertDb, initDatabase} from "../../../testIntegDatabase";

describe('DELETE Impact', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    it('delete the impact', done => {
        chai.request(app)
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