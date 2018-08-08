import {gateauImpactTankSpec, papierAImpactTankSpec, sansImpactTankSpec} from "../../../spec/impacttank/testGetImpactTankSpec"
import {init, request, withTest} from "test-api-express-mongo/dist/api"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {withBqtG} from "test-api-express-mongo/dist/domain"
import {ObjectID} from "mongodb"
import {pick} from 'lodash'
import {papierVA} from "../../../database/papier"
import {co2eImpactEntry, vitBImpactEntry, vitCImpactEntry} from "../../../database/impactEntries"
import {gateauItem, gateauTrunk} from "../../../database/gateau"

const unknownId = ObjectID().toString()


describe('GET ImpactTank', function () {

    beforeEach(init(api, ENV, cols))

    it('impact tank papier A', withTest({
        req: {
            url: `/api/impacttank/${papierVA.quantity.bqt}/${papierVA.quantity.g}/${papierVA._id}`
        },
        res: {
            body: {
                _id: papierVA._id,
                quantity: papierVA.quantity,
                items: [{
                    ...pick(co2eImpactEntry, ['_id']),
                    ...withBqtG(11696000, "Mass")
                }]
            }
        }
    }))

    it('impact tank gateau', withTest({
        req: {
            url: `/api/impacttank/${gateauItem.quantity.bqt}/${gateauItem.quantity.g}/${gateauTrunk._id}`,
        },
        res: {
            body: {
                _id: gateauTrunk._id,
                quantity: gateauItem.quantity,
                items: [{
                    ...pick(vitCImpactEntry, ['_id']),
                    ...withBqtG(3, "Dens")
                },
                    {
                        ...pick(vitBImpactEntry, ['_id']),
                        ...withBqtG(0.1, "Dens")
                    }]
            }
        }
    }))

    it('impact tank inconnu', withTest({
        req: {
            url: `/api/impacttank/0.003/Volu/${unknownId}`
        },
        res: {
            body: {
                _id: unknownId,
                ...withBqtG(0.003, "Volu"),
                items: []
            }
        }
    }))

})

