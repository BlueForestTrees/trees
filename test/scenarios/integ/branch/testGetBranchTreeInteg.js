import {init, withTest} from "test-api-express-mongo"
import {withIdBqtG, withId, withIdBqt} from "test-api-express-mongo"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {aTrunk} from "../../../database/lettres"

describe('GET Branch Tree', function () {
    
    beforeEach(init(api, ENV, cols))
    
    it('return null', withTest({
        req: {
            url: `/api/tree/branch/tree/${aTrunk._id}`
        },
        res: {
            body: {
                _id: aTrunk._id,
                bqt: 1,
                items: []
            }
        }
    }))
    
})