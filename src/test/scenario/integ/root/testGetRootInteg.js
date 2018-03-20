import {expect} from 'chai';
import {app} from "../../../../main";
import {badUnitGetRootSpec, emptyGetRootSpec, farineNoBleQtGetRootSpec, gateau1000GGetRootSpec, getRootsSpec, otherUnitGetRootSpec, sameQtGetRootSpec, skate10GetRootSpec} from "../../../spec/root/testGetRootSpec";
import {run} from "../../../util/testIntegApp";
import {init, request} from "../../../util/testIntegApp";

const getRoot = spec => request()
    .get(`/api/root/${spec.req._id}`)
    .then(res => {
        res.should.have.status(200);
        res.body.should.deep.equal(spec.res.body);
    });

const getQuantifiedRoot = spec => request()
    .get(`/api/root/${spec.req.qt}${spec.req.unit ? '/' + spec.req.unit : ''}/${spec.req._id}`)
    .then(res => {
        res.should.have.status(200);
        res.body.should.deep.equal(spec.res.body);
    });

const getErrorQuantifiedRoot = spec => request()
    .get(`/api/root/${spec.req.qt}/${spec.req.unit}/${spec.req._id}`)
    .then(res => {
        res.body.should.deep.equal(spec.res);
    })
    .catch(err => {
        if (err.status) {
            err.should.have.status(spec.res.status);
            err.response.body.message.should.equal(spec.res.bodyMessage);
        } else {
            throw err;
        }
    });

describe('GET Root', function () {

    beforeEach(init);

    it('return roots', run(() => getRoot(getRootsSpec)));

    it('return empty roots', run(() => getRoot(emptyGetRootSpec)));

    it('return an error because unit mismatch', run(() => getErrorQuantifiedRoot(badUnitGetRootSpec)));

    it('return root with same quantity', run(() => getQuantifiedRoot(sameQtGetRootSpec)));

    it('return root with another quantity', run(() => getQuantifiedRoot(gateau1000GGetRootSpec)));

    it('return root with another quantity no unit', run(() => getQuantifiedRoot(skate10GetRootSpec)));

    it('return root with another unit', run(() => getQuantifiedRoot(otherUnitGetRootSpec)));

    it('return root even with no qt in roots', run(() => getQuantifiedRoot(farineNoBleQtGetRootSpec)));

});