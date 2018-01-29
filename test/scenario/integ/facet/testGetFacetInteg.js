import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../../src/index';
import {initDatabase} from "../testIntegPlumbing";
import {getFacet, emptyGetFacet} from "../../../expected/facet/testGetFacetData";

process.env.NODE_ENV = 'test';
process.env.PORT = 8081;

chai.use(chaiHttp);
chai.should();

describe('GET Facets', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    it('return facets', done => testGetFacetsWith(getFacet, done));
    it('return empty facets', done => testGetFacetsWith(emptyGetFacet, done));

});

const testGetFacetsWith = (spec, done) => {
    chai.request(server)
        .get(`/api/facet/${spec.req._id}`)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.deep.equal(spec.res.body);
            done();
        });
};