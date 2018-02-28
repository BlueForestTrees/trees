import chai, {expect} from 'chai';
import {app} from "../../../../main";
import {
    badUnitGetRootSpec,
    emptyGetRootSpec,
    farineNoBleQtGetRootSpec,
    gateau1000GGetRootSpec,
    getRootsSpec,
    lettreGetRootSpec,
    lettreNoDaQtGetRootSpec,
    otherUnitGetRootSpec, papierAGetRootSpec,
    sameQtGetRootSpec,
    skate10GetRootSpec
} from "../../../expected/root/testGetRootData";
import {gateauRootTreeSpec, noRootsTreeSpec} from "../../../expected/root/testGetRootTreeData";
import {run} from "../../../testPlumbing";
import {initDatabase, run2} from "../../../testIntegDatabase";

const getRoot = spec => chai.request(app)
    .get(`/api/root/${spec.req._id}`)
    .then(res => {
        res.should.have.status(200);
        res.body.should.deep.equal(spec.res.body);
    });

const getQuantifiedRoot = spec => chai.request(app)
    .get(`/api/root/${spec.req.qt}${spec.req.unit ? '/' + spec.req.unit : ''}/${spec.req._id}`)
    .then(res => {
        res.should.have.status(200);
        res.body.should.deep.equal(spec.res.body);
    });

const getErrorQuantifiedRoot = spec => chai.request(app)
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

const getRootTree = spec => chai.request(app)
    .get(`/api/root/tree/${spec.req.qt}${spec.req.unit ? '/' + spec.req.unit : ''}/${spec.req._id}`)
    .then(res => {
        res.should.have.status(200);
        if(spec.res.body) {
            res.body.should.deep.equal(spec.res.body);
        }else{
            expect(res.body).to.be.null;
        }
    });

describe('GET Root', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    it('return roots', run(() => getRoot(getRootsSpec)));

    it('return empty roots', run(() => getRoot(emptyGetRootSpec)));

    it('return an error because unit mismatch', run(() => getErrorQuantifiedRoot(badUnitGetRootSpec)));

    it('return root with same quantity', run(() => getQuantifiedRoot(sameQtGetRootSpec)));

    it('return root with another quantity', run(() => getQuantifiedRoot(gateau1000GGetRootSpec)));

    it('return root with another quantity no unit', run(() => getQuantifiedRoot(skate10GetRootSpec)));

    it('return root with another unit', run(() => getQuantifiedRoot(otherUnitGetRootSpec)));

    it('return root even with no qt in roots', run(() => getQuantifiedRoot(farineNoBleQtGetRootSpec)));

    it('return a little tree', run(() => getRootTree(gateauRootTreeSpec)));

    it('return the letters tree', run(() => getRootTree(lettreGetRootSpec)));

    it('return the papier tree', run(() => getRootTree(papierAGetRootSpec)));

    it('return the letters tree with no da quantity', run2(getRootTree,lettreNoDaQtGetRootSpec));

    it('return null', run(() => getRootTree(noRootsTreeSpec)));

});