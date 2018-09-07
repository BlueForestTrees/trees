import {init, withTest} from "test-api-express-mongo"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {gateauRoots} from "../../../database/gateau"
import {oneModifiedResponse} from "test-api-express-mongo"
import {authGod, authSimple} from "../../../database/users"

describe('DELETE branch', function () {

    beforeEach(init(api, ENV, cols))

    it('delete branch no auth', withTest({
        req: {
            method: `DELETE`,
            path: `/api/tree/branch/${gateauRoots[0]._id}`,
        },
        res: {
            code: 401
        }
    }))

    it('delete branch bad auth', withTest({
        req: {
            method: `DELETE`,
            path: `/api/tree/branch/${gateauRoots[0]._id}`,
            headers: authSimple
        },
        res: {
            code: 403
        }
    }))

    it('delete branch', withTest({
        req: {
            method: "DELETE",
            path: "/api/tree/branch",
            param: `/${gateauRoots[0]._id}`,
            headers: authGod
        }, res: {
            expected: oneModifiedResponse
        },
        db: {
            expected: {
                colname: cols.ROOT,
                missingDoc: {_id:gateauRoots[0]._id}
            }
        }
    }))

})