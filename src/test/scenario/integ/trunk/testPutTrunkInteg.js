import {renameTrunkSpec, requantifyTrunkSpec} from "../../../spec/trunk/testPutTrunkSpec";

import {app} from "../../../../main";
import {assertDb} from "../../../util/testIntegDatabase";import {init, request} from "../../../util/testIntegApp";

describe('PUT Trunks', function () {

    beforeEach(init);

    it('rename the trunk', done => testPutTrunkWith(renameTrunkSpec, done));
    it('quantify the trunk', done => testPutTrunkWith(requantifyTrunkSpec, done));

});

const testPutTrunkWith = (spec, done) => {
    request()
        .put(`/api/trunk/${spec.req.params._id}`)
        .send(spec.req.body)
        .then(async res => {
            res.should.have.status(200);
            res.body.should.deep.equal(spec.res.body);
            await assertDb(spec.db.expected);
            done();
        })
        .catch(function (err) {
            done(err);
        });
};