import {firstFacetSpec, thirdFacet, updatingBleFacetSpec} from "../../../expected/facet/testPostFacetData";
import {app} from "../../../../main";
import {assertDb} from "../../../util/testIntegDatabase";import {init, request} from "../../../util/testIntegApp";

describe('POST Facet', function () {

    beforeEach(init);

    it('firstFacet', done => testPostFacetWith(firstFacetSpec, done));
    it('thirdFacet', done => testPostFacetWith(thirdFacet, done));
    it('updatingFacet', done => testPostFacetWith(updatingBleFacetSpec, done));
});

const testPostFacetWith = (testDef, done) => {
    request()
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