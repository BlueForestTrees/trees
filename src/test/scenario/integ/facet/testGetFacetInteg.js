import chai from 'chai';
import {initDatabase} from "../testIntegPlumbing";
import {emptyGetFacet, getFacet} from "../../../expected/facet/testGetFacetData";
import {app} from "../../../../main";

describe('GET Facets', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    it('return facets', done => testGetFacetsWith(getFacet, done));
    it('return empty facets', done => testGetFacetsWith(emptyGetFacet, done));

});

const testGetFacetsWith = (spec, done) => {
    chai.request(app)
        .get(`/api/facet/${spec.req._id}`)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.deep.equal(spec.res.body);
            done();
        });
};