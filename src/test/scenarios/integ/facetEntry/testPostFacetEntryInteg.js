import {app} from "../../../../main";
import {allreadyExistingFacetEntrySpec, postBadGrandeurFacetEntrySpec, postFacetEntrySpec} from "../../../spec/facetEntry/testPostFacetEntrySpec";
import {ObjectIDRegex} from "../../../spec/testCommonSpec";
import {init, request, run, withTest} from "../../../util/testIntegApp";
import {assertDb} from "../../../util/testIntegDatabase";

describe('POST FacetEntry', function () {

    beforeEach(init);

    it('nouvelleFacetEntrySpec', run(() => postFacetEntry(postFacetEntrySpec)));

    it('allreadyExistingFacetEntrySpec', run(() => postFacetEntry(allreadyExistingFacetEntrySpec)));

    it('postBadGrandeurFacetEntrySpec', withTest(postBadGrandeurFacetEntrySpec));


});

const postFacetEntry = spec => request()
    .post(`/api/facetEntry`)
    .send(spec.req.body)
    .then(async res => {
        res.should.have.status(200);
        res.body.should.have.property('_id');
        res.body._id.should.match(ObjectIDRegex);
        res.body.should.deep.equal(spec.res.body(res.body._id));
        if (spec.db)
            await assertDb(spec.db.expected(res.body._id));
    });
