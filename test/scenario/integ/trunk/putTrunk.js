import {rename} from "../../../expected/putTrunk";
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../../src/index';
import {assertDb, initDatabase} from "../../../common/index";
import {quantify} from "../../../expected/putQuantity";

process.env.NODE_ENV = 'test';
process.env.PORT = 8081;


chai.use(chaiHttp);
chai.should();

describe('PUT Trunks', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    it('rename the trunk', done => {
        chai.request(server)
            .put(`/api/trunk/${rename.req.params._id}`)
            .send(rename.req.body)
            .then(async res => {
                res.should.have.status(200);
                res.body.should.deep.equal(rename.res.body);
                await assertDb(rename.db.expected);
                done();
            })
            .catch(function (err) {
                done(err);
            });
    });

    it('quantify the trunk', done => {
        chai.request(server)
            .put(`/api/trunk/${quantify.req.params._id}`)
            .send(quantify.req.body)
            .then(async res => {
                res.should.have.status(200);
                res.body.should.deep.equal(quantify.res.body);
                await assertDb(quantify.db.expected);
                done();
            })
            .catch(function (err) {
                done(err);
            });
    });

});