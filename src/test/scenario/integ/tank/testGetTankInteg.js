import chai from 'chai';
import {assertDb, initDatabase, run} from "../testIntegPlumbing";
import {getAll, getTrunk, search} from "../../../expected/trunk/testGetTrunkData";
import {app} from "../../../../main";
import {existingIdsNewQts} from "../../../expected/root/testPutRootData";
import {putRoot} from "../root/testPutRootInteg";
import {normalTank} from "../../../expected/tank/testGetTankData";

describe('GET Tank', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    //TODO implement
    //it('normalTank', run(() => getTank(normalTank)));

});


export const getTank = getTankData => chai.request(app)
    .get(`/api/tank/${getTankData.req._id}`)
    .then(async (res) => {
        res.should.have.status(200);
        res.body.should.deep.equal(getTankData.res.body);
    });