import api from "../../../../src"
import ENV from "../../../../src/env"
import {init, request, withTest} from "test-api-express-mongo/dist/api"
import {cols} from "../../../../src/const/collections"
import {bleImpacts, bleTrunk} from "../../../database/gateau"
import {withIdBqtG, oneModifiedResponse} from "test-api-express-mongo/dist/domain"
import {createObjectId} from "test-api-express-mongo/dist/util"

describe('PUT Impact', function () {

    beforeEach(init(api, ENV, cols))

    it('put impact', withTest({
        req: {
            url: `/api/impact`,
            method: "PUT",
            body: {...bleImpacts[0], bqt: bleImpacts[0].bqt * 4}
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

})