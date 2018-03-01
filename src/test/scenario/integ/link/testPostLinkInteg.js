import chai from 'chai';

import {app} from "../../../../main";
import {run} from "../../../testPlumbing";
import {assertDb, initDatabase} from "../../../testIntegDatabase";
import {existingLinkPostSpec, newLinkSpec} from "../../../expected/link/testPostLinkData";

describe('POST Link', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    it('newLink', run(() => postLink(newLinkSpec)));

    it('existing link', run(() => postLink(existingLinkPostSpec)));
});

export const postLink = spec => chai.request(app)
    .post('/api/link')
    .send(spec.req.body)
    .then(async res => {
        res.should.have.status(200);
        await assertDb(spec.db.expected);
        res.body.should.deep.equal(spec.res.body);
    });