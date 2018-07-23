import {trunkDeletionSpec} from "../../../spec/trunk/testDeleteTrunkSpec";
import {oneResponse} from "trees-test/dist/domain";

import {assertDb} from "trees-test/dist/db";
import {init, request} from "trees-test/dist/api";
import api from "../../../../src";
import ENV from "../../../../src/env";
import {cols} from "../../../../src/const/collections";
describe('DELETE Trunks', function () {

    beforeEach(init(api, ENV, cols));

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