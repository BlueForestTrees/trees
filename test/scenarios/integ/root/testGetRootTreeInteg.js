import {expect} from 'chai'
import {init, request, withTest} from "test-api-express-mongo"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {farineRoot, farineRoots, gateauRoots, gateauTrunk} from "../../../database/gateau"
import {withoutItemQuantity, withIdBqt, withIdBqtG, withQtCoef, withId} from "test-api-express-mongo"
import {arbreTrunk} from "../../../database/skate"
import {coucheAdhesif, coucheAlu, couchePapier, couchePE, papierVA} from "../../../database/papier"

describe('GET Root tree', function () {
    
    beforeEach(init(api, ENV, cols))
    
    it('return a little tree', withTest({
        req: {
            url: `/api/tree/root/tree/${gateauTrunk._id}`,
        },
        res: {
            body: {
                _id: gateauTrunk._id,
                bqt: 1,
                items: [
                    {
                        _id: gateauRoots[1].rootId,
                        bqt: gateauRoots[1].bqt
                    },
                    {
                        _id: gateauRoots[0].rootId,
                        bqt: gateauRoots[0].bqt,
                        items: [
                            {_id: farineRoots[0].rootId}
                        ]
                    }
                ]
            }
        }
    }))
    
    it('return the papier tree', withTest({
        req: {
            url: `/api/tree/root/tree/${papierVA._id}`,
        },
        res: {
            body: {
                _id: papierVA._id, bqt: 1,
                items: [
                    {_id: coucheAlu._id, bqt: 11},
                    {_id: coucheAdhesif._id, bqt: 100},
                    {_id: couchePapier._id, bqt: 10},
                    {_id: couchePE._id, bqt: 7}
                ]
            }
        }
    }))
    
    it('return null', withTest({
        req: {
            url: `/api/tree/root/tree/${arbreTrunk._id}`,
        },
        res: {
            body: {
                _id: arbreTrunk._id, bqt: 1,
                items: []
            }
        }
    }))
    
})