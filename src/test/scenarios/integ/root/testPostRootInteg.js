import {existingRootPostSpec, newRootSpec} from "../../../spec/root/testPostRootSpec";
import {app} from "../../../../main";
import {run} from "../../../util/testIntegApp";
import {assertDb} from "../../../util/testIntegDatabase";import {init, request} from "../../../util/testIntegApp";

describe('POST Root', function () {

    beforeEach(init);

    it('newRoot', run(() => postRoot(newRootSpec)));

    it('existing root', run(() => postRoot(existingRootPostSpec)));
});

export const postRoot = spec => request()
    .post('/api/root')
    .send(spec.req.body)
    .then(async res => {
        res.should.have.status(200);
        await assertDb(spec.db.expected);
        res.body.should.deep.equal(spec.res.body);
    });