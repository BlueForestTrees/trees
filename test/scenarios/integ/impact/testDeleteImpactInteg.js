import {assertDb} from "test-api-express-mongo"
import {init, request, withTest} from "test-api-express-mongo"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {bleImpacts} from "../../../database/gateau"
import {zeroDeletionOk, oneDeletionOk, twoDeletionOk} from "test-api-express-mongo"
import {authGod, authSimple} from "../../../database/users"

describe('DELETE Impact', function () {

    beforeEach(init(api, ENV, cols))

    it('delete impact no auth', withTest({
        req: {
            url: `/api/tree/impact/${bleImpacts[0]._id}`,
            method: "DELETE"
        },
        res: {
            code: 401
        }
    }))

    it('delete impact bad auth', withTest({
        req: {
            url: `/api/tree/impact/${bleImpacts[0]._id}`,
            method: "DELETE",
            headers: authSimple
        },
        res: {
            code: 403
        }
    }))

    it('delete impact', withTest({
        req: {
            url: `/api/tree/impact/${bleImpacts[0]._id}`,
            method: "DELETE",
            headers: authGod
        },
        res: {
            body: oneDeletionOk
        },
        db: {
            expected: {
                colname: cols.IMPACT,
                missingDoc: {
                    _id: bleImpacts[0]._id
                }
            }
        }
    }))

})