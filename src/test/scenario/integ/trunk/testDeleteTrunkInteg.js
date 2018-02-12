import chai from 'chai';

import {trunkDeletionSpec} from "../../../expected/trunk/testDeleteTrunkData";
import {oneResponse} from "../../../expected/testCommonData";
import {app} from "../../../../main";
import {assertDb, initDatabase} from "../../../testIntegDatabase";

describe('DELETE Trunks', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    it('delete the trunk', done => {
        chai.request(app)
            .del(`/api/trunk/${trunkDeletionSpec.req._id}`)
            .then(async res => {
                res.should.have.status(200);
                res.body.should.deep.equal(oneResponse);
                await assertDb(trunkDeletionSpec.db.expected);
                done();
            })
            .catch(function (err) {
                done(err);
            });
    });

});