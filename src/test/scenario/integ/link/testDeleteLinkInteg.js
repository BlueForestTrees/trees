import {app} from "../../../../main";
import {assertDb} from "../../../util/testIntegDatabase";import {init, request} from "../../../util/testIntegApp";
import {run} from "../../../util/testPlumbing";
import {linkDeletionSpec} from "../../../expected/link/testDeleteLinkData";

describe('DELETE Link', function () {

    beforeEach(init);

    it('delete the link', run(() => deleteLink(linkDeletionSpec)));

});

export const deleteLink = linkDeletion => request()
    .del(`/api/link/${linkDeletion.req.trunkId}/${linkDeletion.req.rootId}`)
    .then(async res => {
        res.should.have.status(200);
        res.body.should.deep.equal(linkDeletion.res.expected);
        await assertDb(linkDeletion.db.expected);
    });
