import chai from 'chai';

import {assertDb, initDatabase} from "../testIntegPlumbing";
import {deletion} from "../../../expected/trunk/testDeleteTrunkData";
import {oneResponse} from "../../../expected/testCommonData";
import {app} from "../../../../main";

describe('DELETE Trunks', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    it('delete the trunk', done => {
        chai.request(app)
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