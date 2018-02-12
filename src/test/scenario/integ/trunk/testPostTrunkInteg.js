import chai from 'chai';

import {ObjectIDRegex} from "../../../expected/testCommonData";
import {cloneTrunkSpec, postTrunkSpec} from "../../../expected/trunk/testPostTrunkData";
import {app} from "../../../../main";
import {assertDb, initDatabase} from "../../../testIntegDatabase";
import {run} from "../../../testIntegPlumbing";

describe('POST Trunks', function () {

    beforeEach(initDatabase);

    it('create the trunk', run(() => createTrunk(postTrunkSpec)));

    it('clone the trunk', run(() => cloneTrunk(cloneTrunkSpec)));

});

const createTrunk = spec => postTrunk(spec, async res => {
    res.should.have.status(200);
    res.body.should.deep.equal(spec.res.body(res.body._id));
    await assertDb(spec.db.expected(res.body._id));
});

const cloneTrunk = spec => postTrunk(spec, async res => {
    res.should.have.status(200);
    res.body.should.have.property('_id');
    res.body._id.should.match(ObjectIDRegex);
    res.body.should.deep.equal(spec.res.body(res.body._id));
    await assertDb(spec.db.expected(res.body._id));
});

const postTrunk = (spec, asserts) => chai.request(app)
    .post('/api/trunk')
    .send(spec.req.body)
    .then(asserts);