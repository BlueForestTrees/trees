import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../../../../src/index';
import {assertDb, initDatabase} from "../../../common";
import {ObjectIDRegex} from "../../../expected/common";
import {post, clone} from "../../../expected/postTrunk";

process.env.NODE_ENV = 'test';
process.env.PORT = 8081;


chai.use(chaiHttp);
chai.should();

describe('POST Trunks', function () {

    beforeEach(initDatabase);

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
                res.body.should.have.property('_id');
                res.body._id.should.match(ObjectIDRegex);
                res.body.should.deep.equal(clone.res.body(res.body._id));
                await assertDb(clone.db.expected(res.body._id));
                done();
            })
            .catch(function (err) {
                done(err);
            })
    });

});