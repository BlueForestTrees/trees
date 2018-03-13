import {badUnitGetBranchSpec, branchWithoutQtSpec, emptyGetBranchSpec, farine1000GGetBranchSpec, getBranchsSpec, otherUnitGetBranchSpec, sameQtGetBranchSpec} from "../../../expected/branch/testGetBranchData";
import {run} from "../testIntegPlumbing";
import {init, request} from "../../../util/testIntegApp";

const getBranch = spec => request()
    .get(`/api/branch/${spec.req._id}`)
    .then(res => {
        res.should.have.status(200);
        res.body.should.deep.equal(spec.res.body);
    });

const getQuantifiedBranch = spec => request()
    .get(`/api/branch/${spec.req.qt}/${spec.req.unit}/${spec.req._id}`)
    .then(res => {
        res.should.have.status(200);
        res.body.should.deep.equal(spec.res.body);
    });

const getErrorQuantifiedBranch = spec => request()
    .get(`/api/branch/${spec.req.qt}/${spec.req.unit}/${spec.req._id}`)
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

describe('GET Branch', function () {

    beforeEach(init);

    it('return branchs', run(() => getBranch(getBranchsSpec)));

    it('return empty branchs', run(() => getBranch(emptyGetBranchSpec)));

    it('return an error because unit mismatch', run(() => getErrorQuantifiedBranch(badUnitGetBranchSpec)));

    it('return branch with same quantity', run(() => getQuantifiedBranch(sameQtGetBranchSpec)));

    it('return branch with another quantity', run(() => getQuantifiedBranch(farine1000GGetBranchSpec)));

    it('return branch with another unit', run(() => getQuantifiedBranch(otherUnitGetBranchSpec)));

    it('return branch even with no qt in branchs', run(() => getQuantifiedBranch(branchWithoutQtSpec)));

});