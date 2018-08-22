import {init, withTest} from "test-api-express-mongo/dist/api"
import {withIdBqtG, withId, withIdBqt} from "test-api-express-mongo/dist/domain"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {aTrunk} from "../../../database/lettres"

describe('GET Branch Tree', function () {
    
    beforeEach(init(api, ENV, cols))
    
    it('return null', withTest({
        req: {
            url: `/api/branch/tree/${aTrunk._id}`
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