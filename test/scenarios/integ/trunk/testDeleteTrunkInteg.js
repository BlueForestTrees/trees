import {init, request, withTest} from "test-api-express-mongo/dist/api"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {gateauTrunk} from "../../../database/gateau"

describe('DELETE Trunks', function () {

    beforeEach(init(api, ENV, cols))

    it('DELETE A TRUNK', withTest({
        req: {
            method: "DELETE",
            url: `/api/trunk/${gateauTrunk._id}`
        },
        db: {
            expected: {
                colname: cols.TRUNK,
                missingDoc: {_id: gateauTrunk._id}
            }
        }
    }))

})