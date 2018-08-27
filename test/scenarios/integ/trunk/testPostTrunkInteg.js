import {init, withTest} from "test-api-express-mongo"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {createStringObjectId, createObjectId} from "test-api-express-mongo"
import {withError} from "test-api-express-mongo"
import {arbreTrunk} from "../../../database/skate"

const trunk = {_id: createObjectId(), color: "#FFCC00", name: "RATtatouille1664", quantity: {g: "Mass", bqt: 450}}
const badTrunk = {_id: "XXX" + createStringObjectId() + "XXX", color: "#FF00", quantity: {g: "ass", bqt: "sd"}}

describe('POST Trunks', function () {

    beforeEach(init(api, ENV, cols))

    it('post a new trunk', withTest({
        req: {
            url: "/api/tree/trunk",
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

    it('post existing trunk', withTest({
        req: {
            method: "POST",
            url: "/api/tree/trunk",
            body: arbreTrunk
        }, res: {
            code: 400,
            body: withError(1, "allready exists")
        }
    }))

    it('refuse to create a bad trunk', withTest({
        req: {
            url: "/api/tree/trunk",
            method: "POST",
            body: badTrunk
        },
        res: {
            code: 400,
            bodypath: [
                {path: "$.errors['quantity.g'].msg", value: "should be Mass, Dens, Long, Tran..."},
                {path: "$.errors['quantity.bqt'].msg", value: "must be a valid number"},
                {path: "$.errors.name.msg", value: "Invalid value"},
                {path: "$.errors.color.msg", value: "Invalid value"},
                {path: "$.errors.color.value", value: "#FF00"},
                {path: "$.errors._id.msg", value: "invalid mongo id"},
            ]
        },
        db: {
            expected: {
                colname: cols.TRUNK,
                missingDoc: badTrunk
            }
        }
    }))

})