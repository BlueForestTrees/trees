import {emptyGetFacetSpec, emptyQuantifiedGetFacetSpec, getFacetSpec, getQuantifiedFacetSpec} from "../../../spec/facet/testGetFacetSpec";
import {init, request} from "trees-test/dist/api";
import api from "../../../../src";
import ENV from "../../../../src/env";
import {cols} from "../../../../src/const/collections";
describe('GET Facets', function () {

    beforeEach(init(api, ENV, cols));

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