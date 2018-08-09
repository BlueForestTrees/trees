import {expect} from 'chai'
import {withError, withoutQuantity, withQtCoef} from "test-api-express-mongo/dist/domain"
import {init, request, run, withTest} from "test-api-express-mongo/dist/api"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {omit} from 'lodash'
import {clon} from "test-api-express-mongo/dist/util"
import {withInfos} from "test-api-express-mongo/dist/db"
import {withIdBqtG} from "test-api-express-mongo/dist/domain"
import {banane, bananeBC, transport} from "../../../database/banane"
import {farineBranch, farineRoot, gateauRoot, laitTrunk} from "../../../database/gateau"
import {skateRoot} from "../../../database/skate"


describe('GET Root', function () {

    beforeEach(init(api, ENV, cols))

    it('return banane with roots & relativeTo', withTest({
        req: {
            method: "GET",
            url: `/api/root/${bananeBC._id}`
        },
        res: {
            bodypath: {path: `$.items[?(@._id==="${transport._id}")].relativeTo`, value: [banane._id]}
        }
    }))

    it('return roots', withTest({
        req: {
            method: "GET",
            url: `/api/root/${gateauRoot._id}`
        },
        res: {
            body: () => ({
                ...omit(gateauRoot, ['items', 'quantity']),
                items: withInfos(cols.TRUNK, gateauRoot.items)
            })
        }
    }))

    it('return empty roots', withTest({
        req: {
            method: "GET",
            url: `/api/root/${laitTrunk._id}`
        },
        res: {
            body: {
                _id: laitTrunk._id,
                items: []
            }
        }
    }))

})