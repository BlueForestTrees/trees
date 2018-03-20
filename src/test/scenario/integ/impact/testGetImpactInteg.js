import {emptyGetImpactSpec, emptyQuantifiedGetImpactSpec, getImpactSpec, getQuantifiedImpactSpec} from "../../../spec/impact/testGetImpactSpec";
import {app} from "../../../../main";
import {init, request} from "../../../util/testIntegApp";

describe('GET Impacts', function () {

    beforeEach(init);

    it('return impacts', done => testGetImpactsWith(getImpactSpec, done));
    it('return quantified impacts', done => testGetQuantifiedImpactsWith(getQuantifiedImpactSpec, done));
    it('return empty impacts', done => testGetImpactsWith(emptyGetImpactSpec, done));
    it('return quantified empty impacts', done => testGetQuantifiedImpactsWith(emptyQuantifiedGetImpactSpec, done));

});

const testGetImpactsWith = (spec, done) =>
    testImpactsWith(`/api/impact/${spec.req._id}`, spec, done);

const testGetQuantifiedImpactsWith = (spec, done) =>
    testImpactsWith(`/api/impact/${spec.req.qt}/${spec.req.unit}/${spec.req._id}`, spec, done);

const testImpactsWith = (url, spec, done) => {
    request()
        .get(url)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.deep.equal(spec.res.body);
            done();
        });
};