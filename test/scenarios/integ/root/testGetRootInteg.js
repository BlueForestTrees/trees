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
            url: `/api/root/1/Nomb/${bananeBC._id}`
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
                items: withInfos(cols.TRUNK, withoutQuantity(clon(gateauRoot.items)))
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

    it('return root with same quantity', withTest({
        req: {
            method: "GET",
            url: `/api/root/${gateauRoot.quantity.bqt}/${gateauRoot.quantity.g}/${gateauRoot._id}`
        },
        res: {
            body: () => ({
                ...omit(gateauRoot, 'items'),
                items: withInfos(cols.TRUNK, clon(gateauRoot.items))
            })
        }
    }))

    it('return root with another quantity', withTest({
        req: {
            method: "GET",
            url: `/api/root/${gateauRoot.quantity.bqt * 2}/${gateauRoot.quantity.g}/${gateauRoot._id}`
        },
        res: {
            body: () => ({
                ...withQtCoef(gateauRoot, 2),
                items: withInfos(cols.TRUNK, withQtCoef(gateauRoot.items, 2))
            })
        }
    }))

    it('return an error because unit mismatch', withTest({
        req: {
            method: "GET",
            url: `/api/root/1/Volu/${gateauRoot._id}`
        },
        res: {
            code: 400,
            body: withError(3, "Units mismatch: 'Volu' and 'Mass'")
        }
    }))

    it('return root with another quantity no unit', withTest({
        req: {
            method: "GET",
            url: `/api/root/${skateRoot.quantity.bqt * 2}/${skateRoot.quantity.g}/${skateRoot._id}`
        },
        res: {
            body: () => ({
                ...withQtCoef(skateRoot, 2),
                items: withInfos(cols.TRUNK, withQtCoef(skateRoot.items, 2))
            })
        }
    }))

    it('return root even with no qt in roots', withTest({
        req: {
            method: "GET",
            url: `/api/root/60/Mass/${farineRoot._id}`
        },
        res: {
            body: () => ({
                ...withIdBqtG(farineRoot._id, 60, "Mass"),
                items: withInfos(cols.TRUNK, clon(farineRoot.items))
            })
        }
    }))

})