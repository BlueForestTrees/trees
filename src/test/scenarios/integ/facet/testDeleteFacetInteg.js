import {facetDeletionSpec} from "../../../spec/facet/testDeleteFacetSpec";
import {app} from "../../../../main";
import {assertDb} from "../../../util/testIntegDatabase";import {init, request} from "../../../util/testIntegApp";

describe('DELETE Facet', function () {

    beforeEach(init);

    it('delete the facet', done => {
        request()
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