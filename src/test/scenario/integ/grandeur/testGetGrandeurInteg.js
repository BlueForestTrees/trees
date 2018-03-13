import chai from 'chai';
import {appPromise} from "../../../../main";
import {initDatabase} from "../../../testIntegDatabase";
import {getGrandeurSpec} from "../../../expected/grandeur/testGetGrandeurData";

let app = null;

describe('GET Grandeurs', function () {

    beforeEach(async () => {
        await initDatabase();
        app = await appPromise;
    });

    it('return grandeurs', done => testGetGrandeursWith(getGrandeurSpec, done));

});

const testGetGrandeursWith = (spec, done) => {
    chai.request(app)
        .get(`/api/grandeurs`)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.deep.equal(spec.res.body);
            done();
        });
};