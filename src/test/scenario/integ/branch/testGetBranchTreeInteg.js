import {expect} from 'chai';
import {run} from "../testIntegPlumbing";
import {branchTreeSpec, noBranchsTreeSpec} from "../../../expected/branch/testGetBranchTreeData";
import {init, request} from "../../../util/testIntegApp";

const getBranchTree = spec => request()
    .get(`/api/branch/tree/${spec.req.qt}/${spec.req.unit}/${spec.req._id}`)
    .then(res => {
        res.should.have.status(200);
        if (spec.res.body) {
            res.body.should.deep.equal(spec.res.body);
        } else {
            expect(res.body).to.be.null;
        }
    });

describe('GET Branch Tree', function () {

    beforeEach(init);

    it('return a branch tree', run(() => getBranchTree(branchTreeSpec)));

    it('return null', run(() => getBranchTree(noBranchsTreeSpec)));

});