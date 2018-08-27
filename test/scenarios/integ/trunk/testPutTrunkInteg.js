import {withIdBqtG, withIdBqt, withBqtG, oneModifiedResponse, noneModifiedResponse} from "test-api-express-mongo"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {init, withTest} from "test-api-express-mongo"
import {gateauTrunk} from "../../../database/gateau"

describe('PUT Trunks', function () {

    beforeEach(init(api, ENV, cols))

    it('update the trunk', withTest({
        req: {
            method: "PUT",
            url: `/api/tree/trunk/${gateauTrunk._id}`,
            body: {
                name: "baChar",
                ...withBqtG(gateauTrunk.quantity.bqt * 2, "Mass"),
            }
        }, res: {
            body: oneModifiedResponse
        }, db: {
            expected: {
                colname: cols.TRUNK,
                doc: {
                    ...gateauTrunk,
                    name: "baChar",
                    ...withBqtG(gateauTrunk.quantity.bqt * 2, "Mass")
                }
            }
        }
    }))

    it('update trunk name only', withTest({
        req: {
            method: "PUT",
            url: `/api/tree/trunk/${gateauTrunk._id}`,
            body: {
                name: "bisou"
            }
        }, res: {
            body: oneModifiedResponse
        }, db: {
            expected: {
                colname: cols.TRUNK,
                doc: {
                    ...gateauTrunk,
                    name: "bisou"
                }
            }
        }
    }))

    it('update without changes trunk', withTest({
        req: {
            method: "PUT",
            url: `/api/tree/trunk/${gateauTrunk._id}`,
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
            url: `/api/tree/trunk/${gateauTrunk._id}`,
            body: {
                name: "baChar",
                quantity: {bqt: 1000}
            }
        }, res: {
            code: 400
        }
    }))
})