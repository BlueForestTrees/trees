import {init, request} from "../../../util/testIntegApp";
import {getGrandeurSpec} from "../../../expected/grandeur/testGetGrandeurData";

describe('GET Grandeurs', function () {

    beforeEach(init);

    it('return grandeurs', done => testGetGrandeursWith(getGrandeurSpec, done));

});

const testGetGrandeursWith = (spec, done) => {
    request()
        .get(`/api/grandeurs`)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.deep.equal(spec.res.body);
            done();
        });
};