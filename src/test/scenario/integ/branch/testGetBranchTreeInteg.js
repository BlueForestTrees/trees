import chai, {expect} from 'chai';
import {app} from "../../../../main";
import {initDatabase} from "../../../testIntegDatabase";
import {run} from "../testIntegPlumbing";
import {branchTreeSpec, noBranchsTreeSpec} from "../../../expected/branch/testGetBranchTreeData";

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

describe('GET Branch Tree', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    it('return a branch tree', run(() => getBranchTree(branchTreeSpec)));

    it('return null', run(() => getBranchTree(noBranchsTreeSpec)));

});