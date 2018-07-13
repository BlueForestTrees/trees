import {badUnitGetBranchSpec, branchWithoutQtSpec, emptyGetBranchSpec, farine1000GGetBranchSpec, getBranchsSpec, otherUnitGetBranchSpec, sameQtGetBranchSpec} from "../../../spec/branch/testGetBranchSpec";
import {run, withTest} from "../../../util/testIntegApp";
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

describe('GET Branch', function () {

    beforeEach(init);

    it('return branchs', run(() => getBranch(getBranchsSpec)));

    it('return empty branchs', run(() => getBranch(emptyGetBranchSpec)));

    it('return an error because unit mismatch', withTest(badUnitGetBranchSpec));

    it('return branch with same quantity', run(() => getQuantifiedBranch(sameQtGetBranchSpec)));

    it('return branch with another quantity', run(() => getQuantifiedBranch(farine1000GGetBranchSpec)));

    it('return branch with another unit', run(() => getQuantifiedBranch(otherUnitGetBranchSpec)));

    it('return branch even with no qt in branchs', run(() => getQuantifiedBranch(branchWithoutQtSpec)));

});