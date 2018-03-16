import {emptyGetFacetSpec, emptyQuantifiedGetFacetSpec, getFacetSpec, getQuantifiedFacetSpec} from "../../../expected/facet/testGetFacetData";
import {app} from "../../../../main";
import {init, request} from "../../../util/testIntegApp";

describe('GET Facets', function () {

    beforeEach(init);

    it('return facets', done => testGetFacetsWith(getFacetSpec, done));
    it('return quantified facets', done => testGetQuantifiedFacetsWith(getQuantifiedFacetSpec, done));
    it('return empty facets', done => testGetFacetsWith(emptyGetFacetSpec, done));
    it('return quantified empty facets', done => testGetQuantifiedFacetsWith(emptyQuantifiedGetFacetSpec, done));

});

const testGetFacetsWith = (spec, done) =>
    testFacetsWith(`/api/facet/${spec.req._id}`, spec, done);

const testGetQuantifiedFacetsWith = (spec, done) =>
    testFacetsWith(`/api/facet/${spec.req.qt}/${spec.req.unit}/${spec.req._id}`, spec, done);

const testFacetsWith = (url, spec, done) => {
    request()
        .get(url)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.deep.equal(spec.res.body);
            done();
        });
};