import chai from 'chai';
import {emptyGetImpactSpec, getImpactSpec} from "../../../expected/impact/testGetImpactData";
import {app} from "../../../../main";
import {initDatabase} from "../../../testIntegDatabase";

describe('GET Impacts', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    it('return impacts', done => testGetImpactsWith(getImpactSpec, done));
    it('return empty impacts', done => testGetImpactsWith(emptyGetImpactSpec, done));

});

const testGetImpactsWith = (spec, done) => {
    chai.request(app)
        .get(`/api/impact/${spec.req._id}`)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.deep.equal(spec.res.body);
            done();
        });
};