import chai from 'chai';
import {match, mock} from 'sinon';

import {existingIds, newRoot} from "../../../expected/root/testPostRootData";
import {assertDb, initDatabase, run} from "../testIntegPlumbing";
import {app} from "../../../../main";

describe('POST Root', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    it('newRoot', run(() => postRoot(newRoot)));

    it('existingIds', run(() => postRoot(existingIds)));
});

export const postRoot = testDef => chai.request(app)
    .post('/api/root')
    .send(testDef.req.body)
    .then(async (res) => {
        res.should.have.status(200);
        await assertDb(testDef.db.expected);
        res.body.should.deep.equal(testDef.res.body);
    });