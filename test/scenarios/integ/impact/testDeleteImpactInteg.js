import {assertDb} from "test-api-express-mongo"
import {init, request, withTest} from "test-api-express-mongo"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {bleImpacts, bleTrunk} from "../../../database/gateau"
import {zeroDeletionOk, oneDeletionOk, twoDeletionOk} from "test-api-express-mongo"

describe('DELETE Impact', function () {

    beforeEach(init(api, ENV, cols))

    it('delete an impact', withTest({
        req: {
            url: `/api/tree/impact/${bleImpacts[0]._id}`,
            method: "DELETE"
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

    it('delete non existing impact of a trunk', withTest([
        {
            req: {
                url: `/api/tree/impact/${bleImpacts[0].trunkId}`,
                method: "DELETE"
            },
            res: {
                expected: {body: twoDeletionOk}
            }
        },
        {
            req: {
                url: `/api/tree/impact/${bleImpacts[0].trunkId}`,
                method: "DELETE"
            },
            res: {
                body: zeroDeletionOk
            }
        }
    ]))

})