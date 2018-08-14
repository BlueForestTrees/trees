import {assertDb} from "test-api-express-mongo/dist/db"
import {init, request, withTest} from "test-api-express-mongo/dist/api"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {bleFacets} from "../../../database/gateau"
import {oneModifiedResponse} from "test-api-express-mongo/dist/domain"
import {remove} from "test-api-express-mongo/dist/util"

describe('DELETE Facet', function () {

    beforeEach(init(api, ENV, cols))

    it('delete the facet', withTest({
        req: {
            url: `/api/facet/${bleFacets[0]._id}`,
            method: "DELETE"
        },
        res: {
            expected: oneModifiedResponse
        },
        db: {
            expected: {
                colname: cols.FACET,
                missingDoc: {_id: bleFacets[0]._id}
            }
        }
    }))

})