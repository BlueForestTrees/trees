import {gateauImpactTankSpec, papierAImpactTankSpec, sansImpactTankSpec} from "../../../spec/impacttank/testGetImpactTankSpec";
import {init, request, run, run2, withTest} from "../../../util/testIntegApp";

describe('GET ImpactTank', function () {

    beforeEach(init);

    it('impact tank papier A', withTest(papierAImpactTankSpec));

    it('impact tank gateau', withTest(gateauImpactTankSpec));

    it('impact tank inconnu', withTest(sansImpactTankSpec));

});

