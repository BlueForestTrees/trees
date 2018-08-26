import {assertDb} from "test-api-express-mongo/dist/db"
import {init, request, withTest} from "test-api-express-mongo/dist/api"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {prixImpactEntry} from "../../../database/impactEntries"
import {farineTrunk} from "../../../database/gateau"
import {oneResponse} from "test-api-express-mongo/dist/domain"
import {object, createObjectId} from "test-api-express-mongo/dist/util"

describe('POST Impact', function () {
    
    beforeEach(init(api, ENV, cols))
    
    const impact = {_id: createObjectId(), trunkId: farineTrunk._id, impactId: prixImpactEntry._id, bqt: 4}
    const impact2 = {_id: createObjectId(), trunkId: farineTrunk._id, impactId: prixImpactEntry._id, bqt: 4}
    
    let postImpactReq = impact => ({
        req: {
            url: `/api/impact`,
            method: "POST",
            body: impact
        },
        res: {
            body: oneResponse
        }
    })
    
    it('post new impact', withTest({
        ...postImpactReq(impact),
        db: {
            expected: {
                colname: cols.IMPACT,
                doc: impact
            }
        }
    }))
    
    it('post two impacts', withTest([
        postImpactReq(impact),
        postImpactReq(impact2),
        {
            db: {
                expected: {
                    list: [{
                        colname: cols.IMPACT,
                        doc: impact
                    }, {
                        colname: cols.IMPACT,
                        doc: impact2
                    }]
                }
            }
        }
    ]))
    
})