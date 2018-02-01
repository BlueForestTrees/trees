import chai from 'chai';

import {assertDb, initDatabase} from "../testIntegPlumbing";
import {facetDeletion} from "../../../expected/facet/testDeleteFacetData";
import {app} from "../../../../main";

describe('DELETE Facet', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    it('delete the facet', done => {
        chai.request(app)
            .post(`/api/facet/deletion`)
            .send(facetDeletion.req.body)
            .then(async res => {
                res.should.have.status(200);
                res.body.should.deep.equal(facetDeletion.res.expected);
                await assertDb(facetDeletion.db.expected);
                done();
            })
            .catch(function (err) {
                done(err);
            });
    });

});