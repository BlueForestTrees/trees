import chai from 'chai';
import {initDatabase, run} from "../testIntegPlumbing";
import {app} from "../../../../main";
import {normalTankSpec} from "../../../expected/tank/testGetTankData";

describe('GET Tank', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    it('normalTank', run(() => getTank(normalTankSpec)));


});


export const getTank = spec => chai.request(app)
    .get(`/api/tank/${spec.req.qt}${spec.req.unit ? '/' + spec.req.unit : ''}/${spec.req._id}`)
    .then(async (res) => {
        res.should.have.status(200);
        res.body.should.deep.equal(spec.res.body);
    });