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

    it('impacts', withTest({
        req: {
            url: `/api/impact/${bleImpacts._id}`
        },
        res: {
            body: () => ({
                _id: bleImpacts._id,
                items: withInfos(cols.IMPACT_ENTRY, bleImpacts.items)
            })
        }
    }))

    it('empty impacts', withTest({
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


})