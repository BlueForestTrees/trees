import {expect} from 'chai'
import {init, request, withTest} from "test-api-express-mongo/dist/api"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {farineItem, farineRoot, gateauRoot, laitItem} from "../../../database/gateau"
import {withoutItemQuantity, withIdBqt, withIdBqtG, withQtCoef, withId} from "test-api-express-mongo/dist/domain"
import {arbreTrunk} from "../../../database/skate"
import {coucheAdhesif, coucheAlu, couchePapier, couchePE, papierVA} from "../../../database/papier"

describe('GET Root tree', function () {

    beforeEach(init(api, ENV, cols))

    it('return a little tree', withTest({
        req: {
            url: `/api/root/tree/${gateauRoot._id}`,
        },
        res: {
            body: {
                ...withIdBqt(gateauRoot._id, 1),
                items: [
                    {
                        ...farineItem,
                        items: farineRoot.items
                    },
                    laitItem
                ]
            }
        }
    }))

    it('return the papier tree', withTest({
        req: {
            url: `/api/root/tree/${papierVA._id}`,
        },
        res: {
            body: {
                ...withIdBqt(papierVA._id, 1),
                items: [
                    withIdBqt(couchePE._id, 7),
                    withIdBqt(couchePapier._id, 10),
                    withIdBqt(coucheAdhesif._id, 100),
                    withIdBqt(coucheAlu._id, 11)
                ]
            }
        }
    }))

    it('return null', withTest({
        req: {
            url: `/api/root/tree/${arbreTrunk._id}`,
        },
        res: {
            body: {
                ...withIdBqt(arbreTrunk._id, 1),
                items: []
            }
        }
    }))

})