import {assertDb, initDatabase} from "../testIntegPlumbing";
import chai from 'chai';
import {firstFacet, thirdFacet, updatingFacet} from "../../../expected/facet/testPostFacetData";
import {app} from "../../../../main";

describe('POST Facet', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    it('firstFacet', done => testPostFacetWith(firstFacet, done));
    it('thirdFacet', done => testPostFacetWith(thirdFacet, done));
    it('updatingFacet', done => testPostFacetWith(updatingFacet, done));
});

const testPostFacetWith = (testDef, done) => {
    chai.request(app)
        .post(`/api/facet/${testDef.req._id}`)
        .send(testDef.req.body)
        .then(async (res) => {
            res.should.have.status(200);
            res.body.should.deep.equal(testDef.res.body);
            await assertDb(testDef.db.expected);
            done();
        })
        .catch(function (err) {
            done(err);
        });
};