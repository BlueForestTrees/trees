import {init, request, withTest} from "test-api-express-mongo/dist/api"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {withBqtG, withQtCoef, withoutQuantity} from "test-api-express-mongo/dist/domain"
import {withInfos} from "test-api-express-mongo/dist/db"
import {bleFacets, bleImpacts, farineTrunk} from "../../../database/gateau"
import {clon} from "test-api-express-mongo/dist/util"
import {omit} from "lodash"

describe('GET Impacts', function () {

    beforeEach(init(api, ENV, cols))

    it('unquantified impacts', withTest({
        req: {
            url: `/api/impact/${bleImpacts._id}`
        },
        res: {
            body: () => ({
                ...omit(bleFacets, ['items', 'quantity']),
                items: withInfos(cols.IMPACT_ENTRY, withoutQuantity(clon(bleImpacts.items)))
            })
        }
    }))
    it('quantified impacts', withTest({
        req: {
            url: `/api/impact/5000/Mass/${bleImpacts._id}`
        }, res: {
            body: () => ({
                _id: bleImpacts._id,
                ...withBqtG(5000, "Mass"),
                items: withInfos(cols.IMPACT_ENTRY, withQtCoef(bleImpacts.items, 0.5))
            })
        }
    }))
    it('unquantified empty impacts', withTest({
        req: {
            url: `/api/impact/${farineTrunk._id}`
        },
        res: {
            body: {
                _id: farineTrunk._id,
                items: []
            }
        }
    }))
    it('quantified empty impacts', withTest({
        req: {
            url: `/api/impact/15/Mass/5a6a03c03e77667641d21234`
        }, res: {
            body: {
                _id: "5a6a03c03e77667641d21234",
                ...withBqtG(15, "Mass"),
                items: []
            }
        }
    }))

})