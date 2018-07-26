import {postBadColorTrunkSpec, postBadGrandeurTrunkSpec, postTransportTrunkSpec, postTrunkSpec} from "../../../spec/trunk/testPostTrunkSpec";
import {assertDb} from "../../../util/testIntegDatabase";
import {checkError, init, request, run, withTest} from "../../../util/testIntegApp";

describe('POST Trunks', function () {

    beforeEach(init);

    it('create the trunk', run(() => createTrunk(postTrunkSpec)));

    it('create a transport trunk', run(() => createTrunk(postTransportTrunkSpec)));

    it('create the trunk color error', withTest(postBadColorTrunkSpec));

});

const createTrunk = spec =>
    request()
        .post('/api/trunk')
        .send(spec.req.body)
        .then(async res => {
            res.should.have.status(200);
            res.body.should.deep.equal(spec.res.body(res.body._id));
            await assertDb(spec.db.expected(res.body._id));
        });