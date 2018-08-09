import {expect} from 'chai'
import {init, request, withTest} from "test-api-express-mongo/dist/api"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {farineItem, farineRoot, gateauRoot, laitItem} from "../../../database/gateau"
import {withoutItemQuantity, withIdBqt, withIdBqtG, withQtCoef, withId} from "test-api-express-mongo/dist/domain"
import {arbreTrunk} from "../../../database/skate"
import {coucheAdhesif, coucheAlu, couchePapier, couchePE, papierVA} from "../../../database/papier"
import {aTrunk, b2Trunk, baaTrunk, babTrunk, baTrunk, bTrunk, cTrunk, daTrunk, dbaaTrunk, dbaTrunk, dbTrunk, dRoot, dTrunk, e1Trunk, e2Trunk} from "../../../database/lettres"

describe('GET Root tree', function () {

    beforeEach(init(api, ENV, cols))

    it('return a little tree', withTest({
        req: {
            url: `/api/root/tree/${gateauRoot._id}`,
        },
        res: {
            body: {
                ...withId(gateauRoot._id),
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
                ...withId(papierVA._id),
                items: [
                    withIdBqt(couchePE._id, 780000),
                    withIdBqt(couchePapier._id, 2070000),
                    withIdBqt(coucheAdhesif._id, 80000),
                    withIdBqt(coucheAlu._id, 890000)
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
                _id: arbreTrunk._id,
                items: []
            }
        }
    }))

})