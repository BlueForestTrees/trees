import chai from 'chai';
import {app} from "../../../../main";
import {run} from "../../../testPlumbing";
import {initDatabase, run2} from "../../../testIntegDatabase";
import {papierAImpactTankSpec, sansImpactTankSpec, gateauImpactTankSpec} from "../../../expected/impacttank/testGetImpactTankData";

const getTank = spec => {
    return chai.request(app)
        .get(`/api/impacttank/${spec.req.quantity.qt}/${spec.req.quantity.unit}/${spec.req._id}`)
        .then(async (res) => {
            res.should.have.status(200);
            res.body.should.deep.equal(spec.res.body);
        });
};

describe('GET ImpactTank', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    it('papierAImpactTankSpec', run(() => getTank(papierAImpactTankSpec)));

    it('gateauImpactTankSpec', run(() => getTank(gateauImpactTankSpec)));

    it('sansImpactTankSpec', run2(getTank, sansImpactTankSpec));

});

