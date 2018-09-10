import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/collections"
import {oneModifiedResponse} from "test-api-express-mongo"
import {init, withTest} from "test-api-express-mongo"
import {bleTrunk, gateauRoots, pizzaRoots} from "../../../database/gateau"
import {authGod} from "../../../database/users"

describe('PUT Root', function () {

    beforeEach(init(api, ENV, cols))

    it('put root no auth', withTest({
        req: {
            method: "PUT",
            url: '/api/tree/root',
            body: {...gateauRoots[0], bqt: gateauRoots[0].bqt * 4, relativeTo: {_id: bleTrunk._id, bqt: 50320}}
        },
        res: {
            code: 401
        }
    }))

    it('put root not owner', withTest({
        req: {
            method: "PUT",
            url: '/api/tree/root',
            body: {...pizzaRoots[0], bqt: 4},
            headers: authGod
        },
        res: {
            code: 403
        }
    }))

    it('put root', withTest({
        req: {
            method: "PUT",
            url: '/api/tree/root',
            body: {...gateauRoots[0], bqt: gateauRoots[0].bqt * 4, relativeTo: {_id: bleTrunk._id, bqt: 50320}},
            headers: authGod
        },
        res: {
            body: oneModifiedResponse
        },
        db: {
            expected: {
                colname: cols.ROOT,
                doc: {...gateauRoots[0], bqt: gateauRoots[0].bqt * 4, relativeTo: {_id: bleTrunk._id, bqt: 50320}}
            }
        }
    }))
})