import chai, {expect} from 'chai';
import {app} from "../../../../main";
import {gateauRootTreeSpec, lettreGetRootTreeSpec, lettreNoDaQtGetRootTreeSpec, noRootsTreeSpec, papierAGetRootTreeSpec} from "../../../expected/root/testGetRootTreeData";
import {run} from "../../../testPlumbing";
import {initDatabase, run2} from "../../../testIntegDatabase";

const getRootTree = spec => chai.request(app)
    .get(`/api/root/tree/${spec.req.qt}${spec.req.unit ? '/' + spec.req.unit : ''}/${spec.req._id}`)
    .then(res => {
        res.should.have.status(200);
        if (spec.res.body) {
            res.body.should.deep.equal(spec.res.body);
        } else {
            expect(res.body).to.be.null;
        }
    });

describe('GET Root', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    it('return a little tree', run(() => getRootTree(gateauRootTreeSpec)));

    it('return the letters tree', run(() => getRootTree(lettreGetRootTreeSpec)));

    it('return the papier tree', run(() => getRootTree(papierAGetRootTreeSpec)));

    it('return the letters tree with no da quantity', run2(getRootTree, lettreNoDaQtGetRootTreeSpec));

    it('return null', run(() => getRootTree(noRootsTreeSpec)));

});