import {postAdemeTrunkFileSpec, postBadColorTrunkSpec, postBadIdTrunkSpec, postTransportTrunkSpec, postTrunkFileSpec, postTrunkSpec} from "../../../spec/trunk/testPostTrunkSpec"
import {init, withTest} from "test-api-express-mongo/dist/api"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {createStringObjectId, createObjectId} from "test-api-express-mongo/dist/util"

const trunk = {_id: createObjectId(), color: "#FFCC00", name: "RATtatouille1664", g:"Mass"}
const badTrunk = {_id: "XXX" + createStringObjectId() + "XXX", color: "#FF00", g: "ass"}

describe('POST Trunks', function () {

    beforeEach(init(api, ENV, cols))

    it('create the trunk', withTest({
        req: {
            url: "/api/trunk",
            method: "POST",
            body: trunk
        },
        db: {
            expected: {
                colname: cols.TRUNK,
                doc: trunk
            }
        }
    }))

    it('refuse to create a bad trunk', withTest({
        req: {
            url: "/api/trunk",
            method: "POST",
            body: badTrunk
        },
        res: {
            code: 400,
            bodypath: [
                {path: "$.errors.g.msg", value: ["should be Mass, Dens, Long, Tran..."]},
                {path: "$.errors.name.msg", value: ["Invalid value"]},
                {path: "$.errors.color.msg", value: ["Invalid value"]},
                {path: "$.errors.color.value", value: ["#FF00"]},
                {path: "$.errors._id.msg", value: ["invalid mongo id"]}
            ]
        },
        db: {
            expected: {
                colname: cols.TRUNK,
                missingDoc: badTrunk
            }
        }
    }))

    it('post ademe trunk file', withTest(postTrunkFileSpec))
})