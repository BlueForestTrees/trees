import {getAll, search, trunk} from "../../expected/getTrunk";
import {rename} from "../../expected/putTrunk";
import chai from 'chai';
import chaiHttp from 'chai-http';
import {match, mock} from 'sinon';
import server from '../../../src/index';
import {assertDb, initDatabase} from "../../common/index";
import {post, clone} from "../../expected/postTrunk";
import {quantify} from "../../expected/putQuantity";

process.env.NODE_ENV = 'test';
process.env.PORT = 8081;


chai.use(chaiHttp);
chai.should();

describe('Trunks', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    describe('GET /trunks', () => {
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
    });

    describe('GET /trunk',()=>{
        it('return the trunk', done => {
            chai.request(server)
                .get(`/api/trunk/${trunk.req._id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.deep.equal(trunk.res.body);
                    done();
                });
        });
    });

    describe('POST /trunk', () => {
        it('save the trunk', done => {
            chai.request(server)
                .post('/api/trunk')
                .send(post.req.body)
                .then(async res => {
                    res.should.have.status(200);
                    res.body.should.deep.equal(post.res.body(res.body._id));
                    await assertDb(post.db.expected(res.body._id));
                    done();
                })
                .catch(function (err) {
                    done(err);
                });
        });

        it('clone the trunk', done => {
            chai.request(server)
                .post('/api/trunk')
                .send(clone.req.body)
                .then(async res => {
                    res.should.have.status(200);
                    const newId = res.body;
                    //res.body.should.deep.equal(clone.res.body(clone.body._id));
                    await assertDb(clone.db.expected(clone.body._id));
                    done();
                })
                .catch(function (err) {
                    done(err);
                });
        });
    });

    describe('PUT /trunk name', () => {
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
    });

    describe('PUT /trunk quantity', () => {
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

});