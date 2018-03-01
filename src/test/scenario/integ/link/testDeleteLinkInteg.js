import chai from 'chai';

import {rootDeletionSpec} from "../../../expected/root/testDeleteRootData";
import {app} from "../../../../main";
import {assertDb, initDatabase} from "../../../testIntegDatabase";
import {run} from "../../../testPlumbing";
import {linkDeletionSpec} from "../../../expected/link/testDeleteLinkData";

describe('DELETE Link', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    it('delete the link', run(() => deleteLink(linkDeletionSpec)));

});

export const deleteLink = linkDeletion => chai.request(app)
    .del(`/api/link/${linkDeletion.req.trunkId}/${linkDeletion.req.rootId}`)
    .then(async res => {
        res.should.have.status(200);
        res.body.should.deep.equal(linkDeletion.res.expected);
        await assertDb(linkDeletion.db.expected);
    });
