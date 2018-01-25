import {rename} from "./expected/renameTrunk";

process.env.NODE_ENV = 'test';

import chai from 'chai';
import chaiHttp from 'chai-http';
import {mock, match} from 'sinon';
import server from '../src/index';
import {initDatabase} from "./common/index";
import {post} from "./expected/postTrunk";
import {search} from "./expected/search";
import {getAll} from "./expected/getAll";


chai.use(chaiHttp);
chai.should();

describe('Trunks', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    after(async () => {
        //await purgeDatabase();
    });

    describe('/GET all trunks', () => {
        it('return all trunks', done => {
            chai.request(server)
                .get('/api/trunks')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.deep.equal(getAll.expected);
                    done();
                });
        });
    });

    describe('/GET search trunks', () => {
        it('return all trunks whose name start by', done => {
            chai.request(server)
                .get(`/api/trunks?q=${search.term}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.deep.equal(search.expected);
                    done();
                });
        });
    });

    describe('/POST trunk', () => {
        it('save the trunk', done => {
            const agent = chai.request(server);
            agent.post('/api/trunk').send(post.posted).end((err, res) => {
                res.should.have.status(200);
                res.body.should.deep.equal(post.expected(res.body._id));

                agent.get(`/api/trunk/${res.body._id}`).end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.include(post.expected(res.body._id));
                    done();
                })

            })
        });
    });

    describe('/PUT trunk name', () => {
        it('rename the trunk', done => {
            const agent = chai.request(server);
            agent.put(`/api/trunk/${rename._id}`).send(rename.put.body).end((err, res) => {
                res.should.have.status(200);
                res.body.should.deep.equal(rename.put.expected);

                agent.get(`/api/trunk/${rename._id}`).end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.include(rename.post.expected(rename._id));
                    done();
                })

            })
        });
    });


});