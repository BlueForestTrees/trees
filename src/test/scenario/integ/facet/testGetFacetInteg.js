import chai from 'chai';
import {emptyGetFacetSpec, getFacetSpec} from "../../../expected/facet/testGetFacetData";
import {app} from "../../../../main";
import {initDatabase} from "../../../testIntegDatabase";

describe('GET Facets', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    it('return facets', done => testGetFacetsWith(getFacetSpec, done));
    it('return empty facets', done => testGetFacetsWith(emptyGetFacetSpec, done));

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