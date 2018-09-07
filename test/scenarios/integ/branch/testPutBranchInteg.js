import {init, request, withTest} from "test-api-express-mongo"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {farineBranch, gateauRoots} from "../../../database/gateau"
import {oneModifiedResponse} from "test-api-express-mongo"
import {authGod, authSimple} from "../../../database/users"

describe('PUT Branch', function () {

    beforeEach(init(api, ENV, cols))

    it('put branch no auth', withTest({
        req: {
            method: "PUT",
            url: '/api/tree/branch',
            body: {_id: gateauRoots[0]._id, bqt: gateauRoots[0].bqt * 4},
        },
        res: {
            code: 401
        }
    }))

    it('put branch bad auth', withTest({
        req: {
            method: "PUT",
            url: '/api/tree/branch',
            body: {_id: gateauRoots[0]._id, bqt: gateauRoots[0].bqt * 4},
            headers: authSimple
        },
        res: {
            code: 403
        }
    }))

    it('put branch', withTest({
        req: {
            method: "PUT",
            url: '/api/tree/branch',
            body: {_id: gateauRoots[0]._id, bqt: gateauRoots[0].bqt * 4},
            headers: authGod
        },
        res: {
            body: oneModifiedResponse
        },
        db: {
            expected: {
                colname: cols.ROOT,
                doc: {
                    ...gateauRoots[0],
                    bqt: 1 / (gateauRoots[0].bqt * 4)
                }
            }
        }
    }))
})