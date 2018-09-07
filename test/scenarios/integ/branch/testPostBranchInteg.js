import {object, createObjectId} from "test-api-express-mongo"
import {oneResponse} from "test-api-express-mongo"
import {assertDb} from "test-api-express-mongo"
import {run} from "test-api-express-mongo"
import {init, request, withTest} from "test-api-express-mongo"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {biere, capsule} from "../../../database/biere"
import {withError} from "test-api-express-mongo"
import {authGod, god} from "../../../database/users"

describe('POST Branch', function () {

    beforeEach(init(api, ENV, cols))

    const branch = {_id: createObjectId(), trunkId: capsule._id, bqt: 4, branchId: biere._id}
    const expected = {_id: branch._id, oid: god._id, trunkId: biere._id, bqt: 1 / 4, rootId: capsule._id}

    const postBranchReq = {
        req: {
            url: '/api/tree/branch',
            method: "POST",
            body: branch,
            headers: authGod
        }
    }

    it('post branch', withTest({
        ...postBranchReq,
        res: {
            body: oneResponse
        },
        db: {
            expected: {
                colname: cols.ROOT,
                doc: expected
            }
        }
    }))

    it('post existing branch', withTest([
        postBranchReq,
        {
            ...postBranchReq,
            res: {
                code: 400,
                body: withError(1, "allready exists")
            }
        }]))

    it('post branch without auth', withTest({
        req: {
            url: `/api/tree/branch`,
            method: "POST",
            body: branch
        },
        res: {
            code: 401
        }
    }))
})