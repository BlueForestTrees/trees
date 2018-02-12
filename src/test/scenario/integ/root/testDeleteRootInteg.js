import chai from 'chai';

import {rootDeletionSpec} from "../../../expected/root/testDeleteRootData";
import {app} from "../../../../main";
import {assertDb, initDatabase} from "../../../testIntegDatabase";
import {run} from "../../../testIntegPlumbing";

describe('DELETE Root', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    it('delete the root', run(() => deleteRoot(rootDeletionSpec)));

});

export const deleteRoot = rootDeletion => chai.request(app)
    .del(`/api/root/${rootDeletion.req.trunkId}/${rootDeletion.req.rootId}`)
    .then(async res => {
        res.should.have.status(200);
        res.body.should.deep.equal(rootDeletion.res.expected);
        await assertDb(rootDeletion.db.expected);
    });
