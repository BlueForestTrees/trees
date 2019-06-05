import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/collections"
import {init, withTest} from "test-api-express-mongo"
import {gateauRoots} from "../../../database/gateau"
import {oneModifiedResponse} from "test-api-express-mongo"
import {authGod, authSimple} from "../../../database/users"

describe('DELETE Root', function () {

    beforeEach(init(api, ENV, cols))

    it('delete root no auth', withTest({
        req: {
            method: `DELETE`,
            path: `/api/tree/root/${gateauRoots[0]._id}`,
        },
        res: {
            code: 401
        }
    }))

    it('delete root bad auth', withTest({
        req: {
            method: `DELETE`,
            path: `/api/tree/root/${gateauRoots[0]._id}`,
            headers: authSimple
        },
        res: {
            code: 403
        }
    }))

    it('delete root', withTest({
        req: {
            method: `DELETE`,
            path: `/api/tree/root/${gateauRoots[0]._id}`,
            headers: authGod
        },
        res: {
            expected: oneModifiedResponse
        },
        db: {
            expected: {
                colname: cols.ROOT,
                missingDoc: {
                    _id: gateauRoots[0]._id
                }
            }
        }
    }))

})