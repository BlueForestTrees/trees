import {oneModifiedResponse} from "test-api-express-mongo"
import {bleFacets} from "../../../database/gateau"
import {cols} from "../../../../src/const/collections"
import {withTest, init, request} from "test-api-express-mongo"
import {withIdBqt, withId, createObjectId} from "test-api-express-mongo"
import {replaceItem} from "test-api-express-mongo"
import {authGod, authSimple} from "../../../database/users"
import api from "../../../../src"
import ENV from "../../../../src/env"

describe('PUT facet', function () {

    beforeEach(init(api, ENV, cols))

    it('update facet', withTest({
        req: {
            url: `/api/tree/facet`,
            method: "PUT",
            body: {...bleFacets[0], bqt: bleFacets[0].bqt * 2},
            headers: authGod
        },
        res: {
            body: oneModifiedResponse
        },
        db: {
            expected: {
                colname: cols.FACET,
                doc: {...bleFacets[0], bqt: bleFacets[0].bqt * 2}
            }
        }
    }))

    it('update facet no auth', withTest({
        req: {
            url: `/api/tree/facet`,
            method: "PUT",
            body: {...bleFacets[0], bqt: bleFacets[0].bqt * 2},
        },
        res: {
            code: 401
        }
    }))

    it('update facet bad auth', withTest({
        req: {
            url: `/api/tree/facet`,
            method: "PUT",
            body: {...bleFacets[0], bqt: bleFacets[0].bqt * 2},
            headers: authSimple
        },
        res: {
            code: 403
        }
    }))
})
