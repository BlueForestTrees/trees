process.env.NODE_ENV = 'test';

import chai from 'chai';
import chaiHttp from 'chai-http';
import {mock, match} from 'sinon';
import {getQuantity} from "../src/service/trunks";
import server from '../index';

chai.use(chaiHttp);

describe('Trunks', function () {

    beforeEach(() => {

    });

    describe('getQuantity', function(){

        it('', function(){
            //expect(async()=>await getQuantity(56)).to.be.rejectedWith(Error);
        });
    });

    describe('/GET book', () => {
        it('it should GET all the books', (done) => {
            chai.request(server)
                .get('/book')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });


});