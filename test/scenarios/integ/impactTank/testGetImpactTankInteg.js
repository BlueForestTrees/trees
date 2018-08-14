import {gateauImpactTankSpec, papierAImpactTankSpec, sansImpactTankSpec} from "../../../spec/impacttank/testGetImpactTankSpec"
import {init, request, withTest} from "test-api-express-mongo/dist/api"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {withBqtG, withIdBqt} from "test-api-express-mongo/dist/domain"
import {ObjectID} from "mongodb"
import {pick} from 'lodash'
import {papierVA} from "../../../database/papier"
import {co2eImpactEntry, vitBImpactEntry, vitCImpactEntry} from "../../../database/impactEntries"
import {gateauTrunk} from "../../../database/gateau"

const unknownId = ObjectID().toString()

describe('GET ImpactTank', function () {

    beforeEach(init(api, ENV, cols))

    it('impact tank papier A', withTest({
        req: {
            url: `/api/impacttank/${papierVA._id}`
        },
        res: {
            body: [
                withIdBqt(co2eImpactEntry._id, 21107)
            ]
        }
    }))

    it('impact tank gateau', withTest({
        req: {
            url: `/api/impacttank/${gateauTrunk._id}`,
        },
        res: {
            body: [
                withIdBqt(vitCImpactEntry._id, 10),
                withIdBqt(vitBImpactEntry._id, 0.1)
            ]
        }
    }))

    it('impact tank inconnu', withTest({
        req: {
            url: `/api/impacttank/${unknownId}`
        },
        res: {
            body: []
        }
    }))

})

