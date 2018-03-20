import {getAllTrunkSpec, getTrunkSpec, searchTrunkSpec} from "../../../spec/trunk/testGetTrunkSpec";
import {app} from "../../../../main";
import {init, request} from "../../../util/testIntegApp";

describe('GET Trunks', function () {

    beforeEach(init);

    it('return all trunks', done => {
        request()
            .get('/api/trunks')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.deep.equal(getAllTrunkSpec.res.body);
                done();
            });
    });

    it('return trunks whose name start by', done => {
        request()
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
    request()
        .get(`/api/trunk/${spec.req._id}`)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.deep.equal(spec.res.body);
            done();
        });
};