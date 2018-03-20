import {rootDeletionSpec} from "../../../expected/root/testDeleteRootData";
import {app} from "../../../../main";
import {assertDb} from "../../../util/testIntegDatabase";import {init, request} from "../../../util/testIntegUtil";
import {run} from "../../../util/testIntegUtil";

describe('DELETE Root', function () {

    beforeEach(init);

    it('delete the root', run(() => deleteRoot(rootDeletionSpec)));

});

export const deleteRoot = rootDeletion => request()
    .del(`/api/root/${rootDeletion.req.trunkId}/${rootDeletion.req.rootId}`)
    .then(async res => {
        res.should.have.status(200);
        res.body.should.deep.equal(rootDeletion.res.expected);
        await assertDb(rootDeletion.db.expected);
    });
