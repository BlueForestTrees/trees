import {init, request, withTest} from "test-api-express-mongo/dist/api"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {farineBranch} from "../../../database/gateau"
import {oneModifiedResponse} from "test-api-express-mongo/dist/domain"

describe('PUT Branch', function () {

    beforeEach(init(api, ENV, cols))

    it('put branch', withTest({
        req: {
            method: "PUT",
            url: '/api/branch',
            body: {...farineBranch[0], bqt: farineBranch[0].bqt * 4}
        },
        res: {
            body: oneModifiedResponse
        },
        db: {
            expected: {
                colname: cols.BRANCH,
                doc: {...farineBranch[0], bqt: farineBranch[0].bqt * 4}
            }
        }
    }))
})