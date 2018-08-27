import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {run, withTest} from "test-api-express-mongo"
import {init} from "test-api-express-mongo"
import {withError, oneResponse} from "test-api-express-mongo"
import {biere, capsule} from "../../../database/biere"
import {createObjectId} from "test-api-express-mongo"

let _id = createObjectId()
const postARootSpec = {
    req: {
        url: `/api/tree/root`,
        method: "POST",
        body: {_id, trunkId: biere._id, rootId: capsule._id, bqt: 2}
    },
    res: {
        body: oneResponse
    },
    db: {
        expected: {
            colname: cols.ROOT,
            doc: {_id, trunkId: biere._id, rootId: capsule._id, bqt: 2}
        }
    }
}

describe('POST Root', function () {

    beforeEach(init(api, ENV, cols))

    it('post a root', withTest(postARootSpec))

    it('post an existing root', withTest([
        postARootSpec,
        {
            ...postARootSpec,
            res: {
                code: 400,
                body: withError(1,"allready exists")
            }
        }
    ]))

    it('post a bad root', withTest({
        req: {
            url: `/api/tree/root`,
            method: "POST",
            body: {}
        },
        res: {
            code: 400,
            bodypath:[
                {path:"$.errorCode", value:2},
                {path:"$.errors._id.msg", value:"missing"},
                {path:"$.errors.trunkId.msg", value:"missing"},
                {path:"$.errors.rootId.msg", value:"missing"},
                {path:"$.errors.bqt.msg", value:"must be a valid number"},
            ]
        }
    }))

})