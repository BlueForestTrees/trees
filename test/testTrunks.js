import {newTrunk, trunk} from "./model/trunks";

process.env.NODE_ENV = 'test';

import chai from 'chai';
import chaiHttp from 'chai-http';
import {mock, match} from 'sinon';
import server from '../src/index';
import {initDatabase, objectID} from "./common/common";
import {initialTrees} from "./tools/tools";


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
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(initialTrees.length);
                    done();
                });
        });
    });

    //TODO search doudou

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

    // describe('/PUT trunk name', () => {
    //     it('rename the trunk', done => {
    //         const agent = chai.request(server);
    //
    //         agent.put('/api/trunk/${res.body._id}').send(renamedTrunk).end((err, res) => {
    //
    //         });
    //     });
    // });


});