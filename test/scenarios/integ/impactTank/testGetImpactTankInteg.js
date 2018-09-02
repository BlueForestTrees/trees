import {
    gateauImpactTankSpec,
    papierAImpactTankSpec,
    sansImpactTankSpec
} from "../../../spec/impacttank/testGetImpactTankSpec"
import {init, request, withTest} from "test-api-express-mongo"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {withBqtG, withIdBqt} from "test-api-express-mongo"
import {ObjectID} from "mongodb"
import {pick} from 'lodash'
import {papierVA} from "../../../database/papier"
import {co2eImpactEntry, vitBImpactEntry, vitCImpactEntry} from "../../../database/impactEntries"
import {gateauTrunk} from "../../../database/gateau"
import {aTrunk} from "../../../database/lettres"

const unknownId = ObjectID().toString()

describe('GET ImpactTank', function () {
    
    beforeEach(init(api, ENV, cols))
    
    it('impact tank papier A', withTest({
            req: {
                url: `/api/tree/impacttank/${papierVA._id}`
            },
            res: {
                bodypath: [
                    {path: "$[0]._id", value: co2eImpactEntry._id},
                    {path: "$[0].name", value: co2eImpactEntry.name},
                    {path: "$[0].quantity.bqt", value: 21107},
                    {path: "$[0].quantity.g", value: co2eImpactEntry.g},
                ]
            }
        }
    ))
    
    it('impact tank gateau', withTest({
        req: {
            url: `/api/tree/impacttank/${gateauTrunk._id}`,
        },
        res: {
            bodypath: [
                {path: "$[0]._id", value: vitCImpactEntry._id},
                {path: "$[0].name", value: vitCImpactEntry.name},
                {path: "$[0].quantity.bqt", value: 10},
                {path: "$[0].quantity.g", value: vitCImpactEntry.g},
                
                {path: "$[1]._id", value: vitBImpactEntry._id},
                {path: "$[1].name", value: vitBImpactEntry.name},
                {path: "$[1].quantity.bqt", value: 0.1},
                {path: "$[1].quantity.g", value: vitBImpactEntry.g},
                {path: "$[1].quantity.eq", value: vitBImpactEntry.eq},
            ]
        }
    }))

    it('impact tank a', withTest({
        req: {
            url: `/api/tree/impacttank/${aTrunk._id}`
        }
    }))

    it('impact tank inconnu', withTest({
        req: {
            url: `/api/tree/impacttank/${unknownId}`
        },
        res: {
            body: []
        }
    }))
    
})

