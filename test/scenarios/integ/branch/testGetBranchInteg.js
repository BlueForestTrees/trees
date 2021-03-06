import {withInfos} from "test-api-express-mongo"
import {run, withTest, init, request} from "test-api-express-mongo"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/collections"
import {gateauRoots, farineItem, laitBranch, pizzaTrunk} from "../../../database/gateau"
import {withError, withQtCoef, withoutQuantity} from "test-api-express-mongo"
import {omit} from 'lodash'
import {clon} from "test-api-express-mongo"

describe('GET Branch', function () {
    
    beforeEach(init(api, ENV, cols))
    
    it('return branchs', withTest({
        req: {
            url: `/api/tree/branch/${farineItem._id}`
        },
        res: {
            bodypath: [
                {path: "$[0]._id", value: gateauRoots[0].trunkId},
                {path: "$[0].linkId", value: gateauRoots[0]._id},
                {path: "$[0].trunk.quantity.bqt", value: 1/gateauRoots[0].bqt},
                {path: "$[1].trunk.name", value: pizzaTrunk.name},
                {path: "$[1].trunk.color", value: pizzaTrunk.color},
                {path: "$[1].trunk.quantity.g", value: pizzaTrunk.quantity.g},
            ]
        }
    }))
    
    it('return empty branchs', withTest({
        req: {
            url: `/api/tree/branch/${pizzaTrunk._id}`
        },
        res: {
            body: []
        }
    }))
    
})