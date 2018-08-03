import {postAdemeTrunkFileSpec, postBadColorTrunkSpec, postBadIdTrunkSpec, postTransportTrunkSpec, postTrunkSpec} from "../../../spec/trunk/testPostTrunkSpec"
import {init, withTest} from "test-api-express-mongo/dist/api"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {createStringObjectId} from "test-api-express-mongo/dist/util"

const badTrunk = {_id: "XXX"+createStringObjectId()+"XXX", color: "#FFCC00", name: "RATtatouille1664"}

describe('POST Trunks', function () {

    beforeEach(init(api, ENV, cols))

    it('create the trunk', withTest(postTrunkSpec))

    it('refuse to create a trunk with bad id', withTest({
        req: {
            url: "/api/trunk",
            method: "POST",
            body: badTrunk
        },
        res: {
            code: 400,
            bodypath: {path: "$.errors._id.msg", value: ["invalid mongo id"]}
        },
        db: {
            expected: {
                colname: cols.TRUNK,
                missingDoc: badTrunk
            }
        }
    }))

    it('create a transport trunk', withTest(postTransportTrunkSpec))

    it('refuse to create a trunk with color error', withTest(postBadColorTrunkSpec))

    it('post ademe trunk file', withTest(postAdemeTrunkFileSpec))
})