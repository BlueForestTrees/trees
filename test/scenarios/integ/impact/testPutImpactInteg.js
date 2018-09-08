import api from "../../../../src"
import ENV from "../../../../src/env"
import {init, request, withTest} from "test-api-express-mongo"
import {cols} from "../../../../src/const/collections"
import {bleImpacts, bleTrunk} from "../../../database/gateau"
import {withIdBqtG, oneModifiedResponse} from "test-api-express-mongo"
import {createObjectId} from "test-api-express-mongo"
import {authGod, authSimple} from "../../../database/users"

describe('PUT Impact', function () {

    beforeEach(init(api, ENV, cols))

    it('put impact', withTest({
        req: {
            url: `/api/tree/impact`,
            method: "PUT",
            body: {...bleImpacts[0], bqt: bleImpacts[0].bqt * 4},
            headers: authGod
        },
        res: {
            body: oneModifiedResponse
        },
        db: {
            expected: {
                colname: cols.IMPACT,
                doc: {...bleImpacts[0], bqt: bleImpacts[0].bqt * 4}
            }
        }
    }))

    it('put impact no auth', withTest({
        req: {
            url: `/api/tree/impact`,
            method: "PUT",
            body: {...bleImpacts[0], bqt: bleImpacts[0].bqt * 4}
        },
        res: {
            code: 401
        }
    }))

    it('put impact bad auth', withTest({
        req: {
            url: `/api/tree/impact`,
            method: "PUT",
            body: {...bleImpacts[0], bqt: bleImpacts[0].bqt * 4},
            headers: authSimple
        },
        res: {
            code: 403
        }
    }))

})