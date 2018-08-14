import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {oneModifiedResponse} from "test-api-express-mongo/dist/domain"
import {init, withTest} from "test-api-express-mongo/dist/api"
import {bleTrunk, gateauRoots} from "../../../database/gateau"

describe('PUT Root', function () {

    beforeEach(init(api, ENV, cols))

    it('put root', withTest({
        req: {
            method: "PUT",
            url: '/api/root',
            body: {...gateauRoots[0], bqt: gateauRoots[0].bqt * 4, relativeTo: {_id: bleTrunk._id, bqt: 50320}}
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