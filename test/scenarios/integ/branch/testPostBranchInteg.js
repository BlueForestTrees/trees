import {object, createObjectId} from "test-api-express-mongo"
import {oneResponse} from "test-api-express-mongo"
import {assertDb} from "test-api-express-mongo"
import {existingBranchPostSpec, newBranchSpec} from "../../../spec/branch/testPostBranchSpec"
import {run} from "test-api-express-mongo"
import {init, request, withTest} from "test-api-express-mongo"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {biere, capsule} from "../../../database/biere"
import {withError} from "test-api-express-mongo"

describe('POST Branch', function () {

    beforeEach(init(api, ENV, cols))

    const branch = {_id: createObjectId(), trunkId: capsule._id, branchId: biere._id, bqt: 4}

    const postBranchReq = {
        req: {
            url: '/api/tree/branch',
            method: "POST",
            body: branch
        }
    }

    it('post branch', withTest({
        ...postBranchReq,
        res: {
            body: oneResponse
        },
        db: {
            expected: {
                colname: cols.BRANCH,
                doc: branch
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
})