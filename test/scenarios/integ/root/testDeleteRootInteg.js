import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {assertDb} from "test-api-express-mongo/dist/db"
import {init, request, withTest} from "test-api-express-mongo/dist/api"
import {run} from "test-api-express-mongo/dist/api"
import {farineItem, gateauRoots} from "../../../database/gateau"
import {oneModifiedResponse} from "test-api-express-mongo/dist/domain"

describe('DELETE Root', function () {

    beforeEach(init(api, ENV, cols))

    it('delete the root', withTest({
        req: {
            method: `DELETE`,
            path: `/api/root/${gateauRoots[0]._id}`,
        },
        res: {
            expected: oneModifiedResponse
        },
        db: {
            expected: {
                colname: cols.ROOT,
                missingDoc: {
                    _id: gateauRoots[0]._id
                }
            }
        }
    }))

})