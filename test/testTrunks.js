import {newTrunk, trunk} from "./data/trunks";

process.env.NODE_ENV = 'test';

import chai from 'chai';
import chaiHttp from 'chai-http';
import {mock, match} from 'sinon';
import server from '../src/index';
import {objectID, purgeDatabase} from "./common/common";

chai.use(chaiHttp);
chai.should();

describe('Trunks', function () {

    beforeEach(() => {
        purgeDatabase();
    });

    describe('/GET trunks empty', () => {
        it('return emoty array', done => {
            chai.request(server)
                .get('/api/trunks')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/POST trunk', () => {
        it('save the trunk', done => {
            const agent = chai.request(server);
            agent.post('/api/trunk').send(newTrunk).end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body._id.should.match(objectID);
                    res.body.should.deep.equal(trunk(res.body._id));

                    agent.get(`/api/trunk/${res.body._id}`).end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.include(trunk(res.body._id));
                        done();
                    })

                })
        });
    });


});