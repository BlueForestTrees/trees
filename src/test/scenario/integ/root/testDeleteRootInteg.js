import {rootDeletionSpec} from "../../../spec/root/testDeleteRootSpec";
import {app} from "../../../../main";
import {assertDb} from "../../../util/testIntegDatabase";import {init, request} from "../../../util/testIntegApp";
import {run} from "../../../util/testIntegApp";

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
