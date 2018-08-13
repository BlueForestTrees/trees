import {init, request, withTest} from "test-api-express-mongo/dist/api"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {withBqtG, withQtCoef, withoutQuantity} from "test-api-express-mongo/dist/domain"
import {withImpactInfos, withInfos} from "test-api-express-mongo/dist/db"
import {bleTrunk, farineTrunk} from "../../../database/gateau"
import {clon} from "test-api-express-mongo/dist/util"
import {omit} from "lodash"
import {vitCImpactEntry} from "../../../database/impactEntries"

describe('GET Impacts', function () {

    beforeEach(init(api, ENV, cols))

    it('impacts', withTest({
        req: {
            url: `/api/impact/${bleTrunk._id}`
        },
        res: {
            bodypath: [
                {path: "$[0]._id", value: "5a6123c03e77667641d2d2c0"},
                {path: "$[0].color", value: vitCImpactEntry.color},
                {path: "$[1]._id", value: "5a6123c03e77667641d2d2c1"},
                {path: "$[1].name", value: "Ivitamine B"},
                {path: "$[1].quantity.bqt", value: 0.15},
                {path: "$[1].quantity.g", value: vitCImpactEntry.g},
            ]
        }
    }))

    it('empty impacts', withTest({
        req: {
            url: `/api/impact/${farineTrunk._id}`
        },
        res: {
            body: []
        }
    }))


})