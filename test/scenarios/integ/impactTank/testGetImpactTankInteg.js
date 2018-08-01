import {gateauImpactTankSpec, papierAImpactTankSpec, sansImpactTankSpec} from "../../../spec/impacttank/testGetImpactTankSpec"
import {init, request, withTest} from "api-test/dist/api"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"

describe('GET ImpactTank', function () {

    beforeEach(init(api, ENV, cols))

    it('impact tank papier A', withTest(papierAImpactTankSpec))

    it('impact tank gateau', withTest(gateauImpactTankSpec))

    it('impact tank inconnu', withTest(sansImpactTankSpec))

})

