import {init, withTest} from "test-api-express-mongo"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {gateauRoots} from "../../../database/gateau"
import {oneModifiedResponse} from "test-api-express-mongo"

describe('DELETE branch', function () {

    beforeEach(init(api, ENV, cols))

    it('delete the branch', withTest({
        req: {
            method: "DELETE",
            path: "/api/tree/branch",
            param: `/${gateauRoots[0]._id}`,
        }, res: {
            expected: oneModifiedResponse
        },
        db: {
            expected: {
                colname: cols.ROOT,
                missingDoc: {_id:gateauRoots[0]._id}
            }
        }
    }))

})