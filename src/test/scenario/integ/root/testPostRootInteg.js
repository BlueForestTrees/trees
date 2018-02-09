import chai from 'chai';
import {match, mock} from 'sinon';

import {existingIdsSpec, newRootSpec} from "../../../expected/root/testPostRootData";
import {assertDb, initDatabase, run} from "../testIntegPlumbing";
import {app} from "../../../../main";

describe('POST Root', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    it('newRoot', run(() => postRoot(newRootSpec)));

    it('existingIds', run(() => postRoot(existingIdsSpec)));
});

export const postRoot = spec => chai.request(app)
    .post('/api/root')
    .send(spec.req.body)
    .then(async res => {
        res.should.have.status(200);
        await assertDb(spec.db.expected);
        res.body.should.deep.equal(spec.res.body);
    });