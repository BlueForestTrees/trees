import chai from 'chai';

import {existingRootPostSpec, newRootSpec} from "../../../expected/root/testPostRootData";
import {app} from "../../../../main";
import {run} from "../../../testPlumbing";
import {assertDb, initDatabase} from "../../../testIntegDatabase";

describe('POST Root', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    it('newRoot', run(() => postRoot(newRootSpec)));

    it('existing root', run(() => postRoot(existingRootPostSpec)));
});

export const postRoot = spec => chai.request(app)
    .post('/api/root')
    .send(spec.req.body)
    .then(async res => {
        res.should.have.status(200);
        await assertDb(spec.db.expected);
        res.body.should.deep.equal(spec.res.body);
    });