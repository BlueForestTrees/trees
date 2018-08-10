import {withIdBqtG, withIdBqt, withBqtG, oneModifiedResponse, noneModifiedResponse} from "test-api-express-mongo/dist/domain"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {init, withTest} from "test-api-express-mongo/dist/api"
import {gateauTrunk} from "../../../database/gateau"

describe('PUT Trunks', function () {

    beforeEach(init(api, ENV, cols))

    it('update the trunk', withTest({
        req: {
            method: "PUT",
            url: `/api/trunk/${gateauTrunk._id}`,
            body: {
                name: "baChar",
                quantity: {bqt: 1000, g: "Mass"}
            }
        }, res: {
            body: oneModifiedResponse
        }, db: {
            expected: {
                colname: cols.TRUNK,
                doc: {
                    ...gateauTrunk,
                    ...withBqtG(1000, "Mass"),
                    name: "baChar"
                }
            }
        }
    }))

    it('update without changes trunk', withTest({
        req: {
            method: "PUT",
            url: `/api/trunk/${gateauTrunk._id}`,
            body: {}
        }, res: {
            body: noneModifiedResponse
        }, db: {
            expected: {
                colname: cols.TRUNK,
                doc: gateauTrunk
            }
        }
    }))

    it('update without b trunk', withTest({
        req: {
            method: "PUT",
            url: `/api/trunk/${gateauTrunk._id}`,
            body: {
                name: "baChar",
                quantity: {bqt: 1000}
            }
        }, res: {
            code: 400
        }
    }))
})