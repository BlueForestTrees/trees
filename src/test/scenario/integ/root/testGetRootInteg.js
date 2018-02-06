import chai from 'chai';
import {initDatabase} from "../testIntegPlumbing";
import {emptyGetRoot, farineNoBleQtGetRoot, getRoots, otherQtGetRoot, otherUnitGetRoot, quantifiedWithoutQtGetRoot, sameQtGetRoot} from "../../../expected/root/testGetRootData";
import {app} from "../../../../main";

describe('GET Root', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    it('return roots', done => testGetRootsWith(getRoots, done));

    //TODO test avec une mauvaise unité entre passée et sous roots.quantity

    it('return empty roots', done => testGetRootsWith(emptyGetRoot, done));

    it('return root with same quantity', done => testGetQuantifiedRootsWith(sameQtGetRoot, done));

    it('return root with another quantity', done => testGetQuantifiedRootsWith(otherQtGetRoot, done));

    it('return root with another unit', done => testGetQuantifiedRootsWith(otherUnitGetRoot, done));

    it('return root even with no qt in roots', done => testGetQuantifiedRootsWith(farineNoBleQtGetRoot, done));


});

const testGetRootsWith = (spec, done) => {
    chai.request(app)
        .get(`/api/root/${spec.req._id}`)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.deep.equal(spec.res.body);
            done();
        });
};

const testGetQuantifiedRootsWith = (spec, done) => {
    console.log(`/api/root/${spec.req.qt}/${spec.req.unit}/${spec.req._id}`);
    chai.request(app)
        .get(`/api/root/${spec.req.qt}/${spec.req.unit}/${spec.req._id}`)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.deep.equal(spec.res.body);
            done();
        });
};