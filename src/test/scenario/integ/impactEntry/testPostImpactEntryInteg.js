import {app} from "../../../../main";
import {allreadyExistingImpactEntrySpec, postBadGrandeurImpactEntrySpec, postImpactEntrySpec} from "../../../expected/impactEntry/testPostImpactEntryData";
import {ObjectIDRegex} from "../../../expected/testCommonData";
import {run} from "../../../util/testIntegApp";
import {init, request} from "../../../util/testIntegApp";

describe('POST ImpactEntry', function () {

    beforeEach(init);

    it('nouvelleImpactEntrySpec', run(() => postImpactEntry(postImpactEntrySpec)));

    it('allreadyExistingImpactEntrySpec', run(() => postImpactEntry(allreadyExistingImpactEntrySpec)));

    it('postBadGrandeurImpactEntrySpec', run(() => postErrorImpactEntry(postBadGrandeurImpactEntrySpec)));


});

const postErrorImpactEntry = spec => request()
    .post(`/api/impactEntry`)
    .send(spec.req.body)
    .then(res => {
        res.body.should.deep.equal(spec.res);
    })
    .catch(err => {
        if (err.status) {
            err.should.have.status(spec.res.status);
            err.response.body.grandeur.msg.should.equal(spec.res.bodyMessage);
        } else {
            throw err;
        }
    });

const postImpactEntry = spec => request()
    .post(`/api/impactEntry`)
    .send(spec.req.body)
    .then(async res => {
        res.should.have.status(200);
        res.body.should.have.property('_id');
        res.body._id.should.match(ObjectIDRegex);
        res.body.should.deep.equal(spec.res.body(res.body._id))
    });
