import chai from 'chai';
import {getAllTrunkSpec, getTrunkSpec, searchTrunkSpec} from "../../../expected/trunk/testGetTrunkData";
import {app} from "../../../../main";
import {initDatabase} from "../../../testIntegDatabase";

describe('GET Trunks', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    it('return all trunks', done => {
        chai.request(app)
            .get('/api/trunks')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.deep.equal(getAllTrunkSpec.res.body);
                done();
            });
    });

    it('return trunks whose name start by', done => {
        chai.request(app)
            .get(`/api/trunks?q=${searchTrunkSpec.req.term}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.deep.equal(searchTrunkSpec.res.body);
                done();
            });
    });

    it('return a trunk', done => testGetTrunkWith(getTrunkSpec, done));

});

const testGetTrunkWith = (spec, done) => {
    chai.request(app)
        .get(`/api/trunk/${spec.req._id}`)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.deep.equal(spec.res.body);
            done();
        });
};