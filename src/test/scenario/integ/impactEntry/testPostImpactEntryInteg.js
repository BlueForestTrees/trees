import chai from 'chai';
import {app} from "../../../../main";
import {allreadyExistingImpactEntrySpec, postBadGrandeurImpactEntrySpec, postImpactEntrySpec} from "../../../expected/impactEntry/testPostImpactEntryData";
import {ObjectIDRegex} from "../../../expected/testCommonData";
import {initDatabase} from "../../../testIntegDatabase";
import {run} from "../../../testPlumbing";

describe('POST ImpactEntry', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    it('nouvelleImpactEntrySpec', run(() => postImpactEntry(postImpactEntrySpec)));

    it('allreadyExistingImpactEntrySpec', run(() => postImpactEntry(allreadyExistingImpactEntrySpec)));

    it('postBadGrandeurImpactEntrySpec', run(() => postErrorImpactEntry(postBadGrandeurImpactEntrySpec)));


});

const postErrorImpactEntry = spec => chai.request(app)
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

const postImpactEntry = spec => chai.request(app)
    .post(`/api/impactEntry`)
    .send(spec.req.body)
    .then(async res => {
        res.should.have.status(200);
        res.body.should.have.property('_id');
        res.body._id.should.match(ObjectIDRegex);
        res.body.should.deep.equal(spec.res.body(res.body._id))
    });
