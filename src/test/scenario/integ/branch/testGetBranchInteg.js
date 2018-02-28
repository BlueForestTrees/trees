import chai, {expect} from 'chai';
import {app} from "../../../../main";
import {initDatabase} from "../../../testIntegDatabase";
import {badUnitGetBranchSpec, branchWithoutQtSpec, emptyGetBranchSpec, farine1000GGetBranchSpec, getBranchsSpec, otherUnitGetBranchSpec, sameQtGetBranchSpec} from "../../../expected/branch/testGetBranchData";
import {run} from "../testIntegPlumbing";
import {noBranchsTreeSpec} from "../../../expected/branch/testGetBranchTreeData";

const getBranch = spec => chai.request(app)
    .get(`/api/branch/${spec.req._id}`)
    .then(res => {
        res.should.have.status(200);
        res.body.should.deep.equal(spec.res.body);
    });

const getQuantifiedBranch = spec => chai.request(app)
    .get(`/api/branch/${spec.req.qt}/${spec.req.unit}/${spec.req._id}`)
    .then(res => {
        res.should.have.status(200);
        res.body.should.deep.equal(spec.res.body);
    });

const getErrorQuantifiedBranch = spec => chai.request(app)
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

const getBranchTree = spec => chai.request(app)
    .get(`/api/branch/tree/${spec.req.qt}/${spec.req.unit}/${spec.req._id}`)
    .then(res => {
        res.should.have.status(200);
        if(spec.res.body) {
            res.body.should.deep.equal(spec.res.body);
        }else{
            expect(res.body).to.be.null;
        }
    });

describe('GET Branch', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    it('return branchs', run(() => getBranch(getBranchsSpec)));

    it('return empty branchs', run(() => getBranch(emptyGetBranchSpec)));

    it('return an error because unit mismatch', run(() => getErrorQuantifiedBranch(badUnitGetBranchSpec)));

    it('return branch with same quantity', run(() => getQuantifiedBranch(sameQtGetBranchSpec)));

    it('return branch with another quantity', run(() => getQuantifiedBranch(farine1000GGetBranchSpec)));

    it('return branch with another unit', run(() => getQuantifiedBranch(otherUnitGetBranchSpec)));

    it('return branch even with no qt in branchs', run(() => getQuantifiedBranch(branchWithoutQtSpec)));

    //TODO
    //it('return the papier tree', run(() => getBranchTree(papierAGetBranchSpec)));
    //
    // it('return the letters tree with no da quantity', run2(getBranchTree,lettreNoDaQtGetBranchSpec));
    //
    it('return null', run(() => getBranchTree(noBranchsTreeSpec)));

});