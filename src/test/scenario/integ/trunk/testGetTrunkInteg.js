import {getQtTrunkSpec, getTrunkSpec, searchTrunkSpec, searchTrunkSpec2} from "../../../spec/trunk/testGetTrunkSpec";
import {app} from "../../../../main";
import {init, request} from "../../../util/testIntegApp";

describe('GET Trunks', function () {

    beforeEach(init);

    it('search by term', () =>
        request()
            .get(`/api/trunks?q=${searchTrunkSpec.req.term}`)
            .then(res => {
                res.should.have.status(200);
                res.body.should.deep.equal(searchTrunkSpec.res.body);
            })
    );

    it('search by term 2', () =>
         request()
            .get(`/api/trunks?q=${searchTrunkSpec2.req.term}`)
            .then(res => {
                res.should.have.status(200);
                res.body.should.deep.equal(searchTrunkSpec2.res.body);
            })
    );

    it('return a trunk', done => testGetTrunkWith(getTrunkSpec, done));

    it('return a quantified trunk', done => testGetQtTrunkWith(getQtTrunkSpec, done));

});

const bodyOk = (spec, done) => (err, res) => {
    res.should.have.status(200);
    res.body.should.deep.equal(spec.res.body);
    done();
};

const testGetTrunkWith = (spec, done) => {
    request()
        .get(`/api/trunk/${spec.req._id}`)
        .end(bodyOk(spec, done));
};

const testGetQtTrunkWith = (spec, done) => {
    request()
        .get(`/api/trunk/${spec.req.qt}/${spec.req.unit}/${spec.req._id}`)
        .end(bodyOk(spec, done));
};