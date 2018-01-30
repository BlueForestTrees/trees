import chai from 'chai';

import server from '../../../../src/index';
import {assertDb, initDatabase} from "../testIntegPlumbing";
import {deletion} from "../../../expected/trunk/testDeleteTrunkData";
import {oneResponse} from "../../../expected/testCommonData";
import {rootDeletion} from "../../../expected/root/testDeleteRootData";

describe('DELETE Root', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    it('delete the root', done => {
        chai.request(server)
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