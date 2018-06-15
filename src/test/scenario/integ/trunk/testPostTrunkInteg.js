import {ObjectIDRegex} from "../../../spec/testCommonSpec";
import {postBadColorTrunkSpec, postBadGrandeurTrunkSpec, postTrunkSpec} from "../../../spec/trunk/testPostTrunkSpec";
import {assertDb} from "../../../util/testIntegDatabase";
import {checkError, init, request, run} from "../../../util/testIntegApp";

describe('POST Trunks', function () {

    beforeEach(init);

    it('create the trunk', run(() => createTrunk(postTrunkSpec)));

    it('create the trunk grandeur error', run(() => checkError(postTrunk, postBadGrandeurTrunkSpec)));

    it('create the trunk color error', run(() => checkError(postTrunk, postBadColorTrunkSpec)));

    //it('clone the trunk', run(() => cloneTrunk(cloneTrunkSpec)));

});

const createTrunk = spec =>
    postTrunk(spec)
        .then(async res => {
            res.should.have.status(200);
            res.body.should.deep.equal(spec.res.body(res.body._id));
            await assertDb(spec.db.expected(res.body._id));
        });

const cloneTrunk = spec =>
    postTrunk(spec)
        .then(async res => {
            res.should.have.status(200);
            res.body.should.have.property('_id');
            res.body._id.should.match(ObjectIDRegex);
            res.body.should.deep.equal(spec.res.body(res.body._id));
            await assertDb(spec.db.expected(res.body._id));
        });

const postTrunk = spec => request()
    .post('/api/trunk')
    .send(spec.req.body);