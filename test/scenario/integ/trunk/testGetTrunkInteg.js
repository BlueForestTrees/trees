import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../../src/index';
import {initDatabase} from "../testIntegPlumbing";
import {getAll, search, trunk} from "../../../expected/trunk/testGetTrunkData";


process.env.NODE_ENV = 'test';
process.env.PORT = 8081;


chai.use(chaiHttp);
chai.should();

describe('GET Trunks', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    it('return all trunks', done => {
        chai.request(server)
            .get('/api/trunks')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.deep.equal(getAll.res.body);
                done();
            });
    });

    it('return trunks whose name start by', done => {
        chai.request(server)
            .get(`/api/trunks?q=${search.req.term}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.deep.equal(search.res.body);
                done();
            });
    });

    it('return a trunk', done => testGetTrunkWith(trunk, done));

});

const testGetTrunkWith = (spec, done) => {
    chai.request(server)
        .get(`/api/trunk/${spec.req._id}`)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.deep.equal(spec.res.body);
            done();
        });
};