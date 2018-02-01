import chai from 'chai';

import {assertDb, initDatabase} from "../testIntegPlumbing";
import {rootDeletion} from "../../../expected/root/testDeleteRootData";
import {app} from "../../../../main";

describe('DELETE Root', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    it('delete the root', done => {
        chai.request(app)
            .del(`/api/root/${rootDeletion.req.trunkId}/${rootDeletion.req.rootId}`)
            .then(async res => {
                res.should.have.status(200);
                res.body.should.deep.equal(rootDeletion.res.expected);
                await assertDb(rootDeletion.db.expected);
                done();
            })
            .catch(function (err) {
                done(err);
            });
    });

});