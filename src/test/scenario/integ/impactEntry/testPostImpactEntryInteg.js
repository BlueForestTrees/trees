import {app} from "../../../../main";
import {allreadyExistingImpactEntrySpec, postBadGrandeurImpactEntrySpec, postImpactEntrySpec} from "../../../spec/impactEntry/testPostImpactEntrySpec";
import {ObjectIDRegex} from "../../../spec/testCommonSpec";
import {init, request, run, withTest} from "../../../util/testIntegApp";
import {assertDb} from "../../../util/testIntegDatabase";

describe('POST ImpactEntry', function () {

    beforeEach(init);

    it('nouvelleImpactEntrySpec', run(() => postImpactEntry(postImpactEntrySpec)));

    it('allreadyExistingImpactEntrySpec', run(() => postImpactEntry(allreadyExistingImpactEntrySpec)));

    it('postBadGrandeurImpactEntrySpec', withTest(postBadGrandeurImpactEntrySpec));


});

const postImpactEntry = spec => request()
    .post(`/api/impactEntry`)
    .send(spec.req.body)
    .then(async res => {
        res.should.have.status(200);
        res.body.should.have.property('_id');
        res.body._id.should.match(ObjectIDRegex);
        res.body.should.deep.equal(spec.res.body(res.body._id));
        if (spec.db) {
            await assertDb(spec.db.expected(res.body._id))
        }
    });
