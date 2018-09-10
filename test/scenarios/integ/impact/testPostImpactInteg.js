import {assertDb} from "test-api-express-mongo"
import {init, request, withTest} from "test-api-express-mongo"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/collections"
import {prixImpactEntry} from "../../../database/impactEntries"
import {farineTrunk} from "../../../database/gateau"
import {oneResponse} from "test-api-express-mongo"
import {object, createObjectId} from "test-api-express-mongo"
import {authGod, authSimple, god, simple} from "../../../database/users"

describe('POST Impact', function () {

    beforeEach(init(api, ENV, cols))

    const impact = {_id: createObjectId(), trunkId: farineTrunk._id, impactId: prixImpactEntry._id, bqt: 4}
    const impact2 = {_id: createObjectId(), trunkId: farineTrunk._id, impactId: prixImpactEntry._id, bqt: 4}

    let postImpactReq = impact => ({
        req: {
            url: `/api/tree/impact`,
            method: "POST",
            body: impact,
            headers: authGod
        },
        res: {
            body: oneResponse
        }
    })

    it('post impact no auth', withTest({
        req: {
            url: `/api/tree/impact`,
            method: "POST",
            body: impact
        },
        res: {
            code: 401
        }
    }))

    it('post impact bad auth', withTest({
        req: {
            url: `/api/tree/impact`,
            method: "POST",
            body: impact,
            headers: authSimple
        },
        res: {
            code: 403
        }
    }))

    it('post impact', withTest({
        ...postImpactReq(impact),
        db: {
            expected: {
                colname: cols.IMPACT,
                doc: {...impact, oid:god._id}
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
                        doc: {...impact, oid:god._id}
                    }, {
                        colname: cols.IMPACT,
                        doc: {...impact2, oid:god._id}
                    }]
                }
            }
        }
    ]))

})