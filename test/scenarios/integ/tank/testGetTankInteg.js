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
            bodypath: [
                {path:"$[0]._id",value: e2Trunk._id},
                {path:"$[0].trunk.quantity.bqt",value: 20002100},
                {path:"$[1]._id",value: e1Trunk._id},
                {path:"$[1].trunk.quantity.bqt",value: 510}
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
            bodypath: [
                {path:"$[0]._id",value: e2Trunk._id},
                {path:"$[0].trunk.quantity.bqt",value: 20001100},
                {path:"$[1]._id",value: daTrunk._id},
                {path:"$[2]._id",value: e1Trunk._id},
                {path:"$[2].trunk.quantity.bqt",value: 510},
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
            bodypath: [
                {path:"$[0]._id",value: e2Trunk._id},
                {path:"$[0].trunk.quantity.bqt",value: 2100},
                {path:"$[1]._id",value: dbTrunk._id},
                {path:"$[2]._id",value: e1Trunk._id},
                {path:"$[2].trunk.quantity.bqt",value: 510},
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

