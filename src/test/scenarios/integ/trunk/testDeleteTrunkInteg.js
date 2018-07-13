import {trunkDeletionSpec} from "../../../spec/trunk/testDeleteTrunkSpec";
import {oneResponse} from "../../../spec/testCommonSpec";
import {app} from "../../../../main";
import {assertDb} from "../../../util/testIntegDatabase";import {init, request} from "../../../util/testIntegApp";

describe('DELETE Trunks', function () {

    beforeEach(init);

    it('delete the trunk', done => {
        request()
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