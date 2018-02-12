import chai from 'chai';

import {facetDeletionSpec} from "../../../expected/facet/testDeleteFacetData";
import {app} from "../../../../main";
import {assertDb, initDatabase} from "../../../testIntegDatabase";

describe('DELETE Facet', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    it('delete the facet', done => {
        chai.request(app)
            .post(`/api/facet/deletion`)
            .send(facetDeletionSpec.req.body)
            .then(async res => {
                res.should.have.status(200);
                res.body.should.deep.equal(facetDeletionSpec.res.expected);
                await assertDb(facetDeletionSpec.db.expected);
                done();
            })
            .catch(function (err) {
                done(err);
            });
    });

});