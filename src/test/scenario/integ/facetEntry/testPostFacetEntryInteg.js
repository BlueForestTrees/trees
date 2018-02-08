import {initDatabase, run} from "../testIntegPlumbing";
import chai from 'chai';
import {app} from "../../../../main";
import {allreadyExistingFacetEntrySpec, postBadGrandeurFacetEntrySpec, postFacetEntrySpec} from "../../../expected/facetEntry/testPostFacetEntryData";
import {ObjectIDRegex} from "../../../expected/testCommonData";

describe('POST FacetEntry', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    it('nouvelleFacetEntrySpec', run(() => postFacetEntry(postFacetEntrySpec)));

    it('allreadyExistingFacetEntrySpec', run(() => postFacetEntry(allreadyExistingFacetEntrySpec)));

    it('postBadGrandeurFacetEntrySpec', run(() => postErrorFacetEntry(postBadGrandeurFacetEntrySpec)));



});

const postErrorFacetEntry = spec => chai.request(app)
    .post(`/api/facetEntry`)
    .send(spec.req.body)
    .catch(err=>{
        err.should.have.status(spec.res.status);
        err.response.body.grandeur.msg.should.equal(spec.res.bodyMessage);
    });

const postFacetEntry = spec => chai.request(app)
    .post(`/api/facetEntry`)
    .send(spec.req.body)
    .then(async res => {
        res.should.have.status(200);
        res.body.should.have.property('_id');
        res.body._id.should.match(ObjectIDRegex);
        res.body.should.deep.equal(spec.res.body(res.body._id))
    });
