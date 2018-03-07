import chai from 'chai';
import {app} from "../../../../main";
import {assertDb, initDatabase} from "../../../testIntegDatabase";
import {existingBranchPostSpec, newBranchSpec} from "../../../expected/branch/testPostBranchData";
import {run} from "../testIntegPlumbing";

describe('POST Branch', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    it('newBranch', run(() => postBranch(newBranchSpec)));

    it('existing branch', run(() => postBranch(existingBranchPostSpec)));
});

export const postBranch = spec => chai.request(app)
    .post('/api/branch')
    .send(spec.req.body)
    .then(async res => {
        res.should.have.status(200);
        await assertDb(spec.db.expected);
        res.body.should.deep.equal(spec.res.body);
    });