import {withIdBqtG, withIdBqt, withBqtG, oneModifiedResponse, noneModifiedResponse} from "test-api-express-mongo"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {init, withTest} from "test-api-express-mongo"
import {gateauTrunk} from "../../../database/gateau"
import {authGod, authSimple} from "../../../database/users"

describe('PUT Trunks', function () {

    beforeEach(init(api, ENV, cols))

    it('update without auth', withTest({
        req: {
            method: "PUT",
            url: `/api/tree/trunk/${gateauTrunk._id}`,
            body: {
                name: "bisou"
            }
        }, res: {
            code: 401
        }
    }))

    it('update without good auth', withTest({
        req: {
            method: "PUT",
            url: `/api/tree/trunk/${gateauTrunk._id}`,
            body: {
                name: "bisou"
            },
            headers: authSimple
        }, res: {
            code: 403
        }
    }))

    it('update bqt', withTest({
        req: {
            method: "PUT",
            url: `/api/tree/trunk/${gateauTrunk._id}`,
            body: {
                name: "baChar",
                ...withBqtG(gateauTrunk.quantity.bqt * 2, "Mass"),
            },
            headers: authGod
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

    it('update name', withTest({
        req: {
            method: "PUT",
            url: `/api/tree/trunk/${gateauTrunk._id}`,
            body: {
                name: "bisou"
            },
            headers: authGod
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
            body: {},
            headers: authGod
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
            },
            headers: authGod
        }, res: {
            code: 400
        }
    }))
})