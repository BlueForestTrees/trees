import {init, request, withTest} from "test-api-express-mongo"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/collections"
import {withBqtG, withQtCoef, withoutQuantity} from "test-api-express-mongo"
import {withImpactInfos, withInfos} from "test-api-express-mongo"
import {bleImpacts, bleTrunk, farineTrunk} from "../../../database/gateau"
import {clon} from "test-api-express-mongo"
import {omit} from "lodash"
import {vitBImpactEntry, vitCImpactEntry} from "../../../database/impactEntries"
import {vitBFacetEntry} from "../../../database/facetEntries"

describe('GET Impacts', function () {

    beforeEach(init(api, ENV, cols))

    it('get impacts', withTest({
        req: {
            url: `/api/tree/impact/${bleTrunk._id}`
        },
        res: {
            bodypath: [
                {path: "$[0]._id", value: bleImpacts[0]._id},
                {path: "$[0].impactId", value: bleImpacts[0].impactId},
                {path: "$[0].color", value: vitCImpactEntry.color},
                {path: "$[1]._id", value: bleImpacts[1]._id},
                {path: "$[1].impactId", value: bleImpacts[1].impactId},
                {path: "$[1].name", value: vitBImpactEntry.name},
                {path: "$[1].quantity.bqt", value: 0.15},
                {path: "$[1].quantity.g", value: vitBImpactEntry.g},
                {path: "$[1].quantity.eq", value: vitBImpactEntry.eq},
            ]
        }
    }))

    it('empty impacts', withTest({
        req: {
            url: `/api/tree/impact/${farineTrunk._id}`
        },
        res: {
            body: []
        }
    }))


})