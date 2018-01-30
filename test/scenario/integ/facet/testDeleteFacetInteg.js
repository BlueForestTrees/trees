import chai from 'chai';

import server from '../../../../src/index';
import {assertDb, initDatabase} from "../testIntegPlumbing";
import {deletion} from "../../../expected/trunk/testDeleteTrunkData";
import {oneResponse} from "../../../expected/testCommonData";
import {rootDeletion} from "../../../expected/root/testDeleteRootData";
import {facetDeletion} from "../../../expected/facet/testDeleteFacetData";

describe('DELETE Facet', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    it('delete the facet', done => {
        chai.request(server)
            .post(`/api/facet/deletion`)
            .send(facetDeletion.req.body)
            .then(async res => {
                res.should.have.status(200);
                res.body.should.deep.equal(facetDeletion.res.expected);
                await assertDb(facetDeletion.db.expected);
                done();
            })
            .catch(function (err) {
                done(err);
            });
    });

});