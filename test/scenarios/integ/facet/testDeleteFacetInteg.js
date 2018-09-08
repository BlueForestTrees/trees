import {assertDb} from "test-api-express-mongo"
import {init, request, withTest} from "test-api-express-mongo"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {bleFacets} from "../../../database/gateau"
import {oneModifiedResponse} from "test-api-express-mongo"
import {remove} from "test-api-express-mongo"
import {authGod, authSimple} from "../../../database/users"

describe('DELETE Facet', function () {

    beforeEach(init(api, ENV, cols))

    it('delete facet no auth', withTest({
        req: {
            url: `/api/tree/facet/${bleFacets[0]._id}`,
            method: "DELETE"
        },
        res: {
            code: 401
        }
    }))

    it('delete facet bad auth', withTest({
        req: {
            url: `/api/tree/facet/${bleFacets[0]._id}`,
            method: "DELETE",
            headers: authSimple
        },
        res: {
            code: 403
        }
    }))

    it('delete facet', withTest({
        req: {
            url: `/api/tree/facet/${bleFacets[0]._id}`,
            method: "DELETE",
            headers: authGod
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