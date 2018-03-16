import {app} from "../../../../main";
import {run} from "../../../util/testPlumbing";
import {assertDb} from "../../../util/testIntegDatabase";import {init, request} from "../../../util/testIntegApp";
import {existingLinkPostSpec, newLinkSpec} from "../../../expected/link/testPostLinkData";

describe('POST Link', function () {

    beforeEach(init);

    it('newLink', run(() => postLink(newLinkSpec)));

    it('existing link', run(() => postLink(existingLinkPostSpec)));
});

export const postLink = spec => request()
    .post('/api/link')
    .send(spec.req.body)
    .then(async res => {
        res.should.have.status(200);
        await assertDb(spec.db.expected);
        res.body.should.deep.equal(spec.res.body);
    });