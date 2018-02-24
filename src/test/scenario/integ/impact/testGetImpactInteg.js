import chai from 'chai';
import {emptyGetImpactSpec, emptyQuantifiedGetImpactSpec, getImpactSpec, getQuantifiedImpactSpec} from "../../../expected/impact/testGetImpactData";
import {app} from "../../../../main";
import {initDatabase} from "../../../testIntegDatabase";

describe('GET Impacts', function () {

    beforeEach(async () => {
        await initDatabase();
    });

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
    chai.request(app)
        .get(url)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.deep.equal(spec.res.body);
            done();
        });
};