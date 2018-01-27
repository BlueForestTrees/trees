import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../../../../src/index';
import {assertDb, initDatabase} from "../../../common";
import {deletion} from "../../../expected/deleteTrunk";
import {oneModifiedResponse, oneResponse} from "../../../expected/common";

process.env.NODE_ENV = 'test';
process.env.PORT = 8081;


chai.use(chaiHttp);
chai.should();

describe('DELETE Trunks', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    it('delete the trunk', done => {
        chai.request(server)
            .del(`/api/trunk/${deletion.req._id}`)
            .then(async res => {
                res.should.have.status(200);
                res.body.should.deep.equal(oneResponse);
                await assertDb(deletion.db.expected);
                done();
            })
            .catch(function (err) {
                done(err);
            });
    });

});