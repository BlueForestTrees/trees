import chai from 'chai';
import {assertDb, initDatabase, run} from "../testIntegPlumbing";
import {getAllTrunkSpec, getTrunkSpec, searchTrunkSpec} from "../../../expected/trunk/testGetTrunkData";
import {app} from "../../../../main";
import {existingIdsNewQtsSpec} from "../../../expected/root/testPutRootData";
import {putRoot} from "../root/testPutRootInteg";
import {normalTankSpec} from "../../../expected/tank/testGetTankData";

describe('GET Tank', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    //TODO implement
    //it('normalTank', run(() => getTank(normalTank)));

});


export const getTank = spec => chai.request(app)
    .get(`/api/tank/${spec.req.qt}${spec.req.unit ? '/'+spec.req.unit : ''}/${spec.req._id}`)
    .then(async (res) => {
        res.should.have.status(200);
        res.body.should.deep.equal(spec.res.body);
    });