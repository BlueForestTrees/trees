import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {init, withTest} from "test-api-express-mongo"
import {laitTrunk} from "../../../database/gateau"
import {aTrunk, daTrunk, dbTrunk, dRoot, dRoots, e1Trunk, e2Trunk} from "../../../database/lettres"
import {withIdBqt, withId, withoutItemQuantity} from "test-api-express-mongo"
import {arbreTrunk, eauTrunk, elecTrunk, skateTrunk} from "../../../database/skate"

describe('GET Tank', function () {
    
    beforeEach(init(api, ENV, cols))
    
    it('get lettre tank', withTest({
        req: {
            url: `/api/tree/tank/${aTrunk._id}`
        },
        res: {
            body: [
                {_id: e2Trunk._id, bqt: 20002100},
                {_id: e1Trunk._id, bqt: 510}
            ]
        }
    }))
    
    it('get lettre tank avec une qt manquante', withTest({
        req: {
            url: `/api/tree/tank/${aTrunk._id}`
        },
        db: {
            preChange: {
                colname: cols.ROOT,
                doc: {
                    ...dRoots[0], bqt: undefined
                }
            }
        },
        res: {
            body: [
                {_id: e2Trunk._id, bqt: 20001100},
                withId(daTrunk._id),
                {_id: e1Trunk._id, bqt: 510}
            ]
        }
    }))
    
    it('get lettre tank avec une qt manquante 2', withTest({
        req: {
            url: `/api/tree/tank/${aTrunk._id}`
        },
        db: {
            preChange: {
                colname: cols.ROOT,
                doc: {...dRoots[1], bqt: undefined}
            }
        },
        res: {
            body: [
                {_id: e2Trunk._id, bqt: 2100},
                withId(dbTrunk._id),
                {_id: e1Trunk._id, bqt: 510}
            ]
        }
    }))
    
    it('get lettre sans tank', withTest({
        req: {
            url: `/api/tree/tank/${laitTrunk._id}`
        },
        res: {
            body: []
        }
    }))
    
})

