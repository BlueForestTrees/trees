import {gateauImpactTankSpec, papierAImpactTankSpec, sansImpactTankSpec} from "../../../expected/impacttank/testGetImpactTankData";
import {init, request, run, run2} from "../../../util/testIntegApp";


const getTank = spec => request()
        .get(`/api/impacttank/${spec.req.quantity.qt}/${spec.req.quantity.unit}/${spec.req._id}`)
        .then(async (res) => {
            res.should.have.status(200);
            res.body.should.deep.equal(spec.res.body);
        });

describe('GET ImpactTank', function () {

    beforeEach(init);

    it('papierAImpactTankSpec', run(() => getTank(papierAImpactTankSpec)));

    it('gateauImpactTankSpec', run(() => getTank(gateauImpactTankSpec)));

    it('sansImpactTankSpec', run2(getTank, sansImpactTankSpec));

});

