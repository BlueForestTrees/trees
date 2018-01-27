import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../../src/index';
import {initDatabase} from "../../../common";
import {tree} from "../../../expected/getTreeSpec";


process.env.NODE_ENV = 'test';
process.env.PORT = 8081;


chai.use(chaiHttp);
chai.should();

describe('GET Tree', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    it('return a tree', done => {
        chai.request(server)
            .get(`/api/tree/${tree.req._id}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.deep.equal(tree.res.body);
                done();
            });
    });

});