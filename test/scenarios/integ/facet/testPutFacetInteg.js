import {oneModifiedResponse} from "test-api-express-mongo/dist/domain"
import {bleFacets} from "../../../database/gateau"
import {cols} from "../../../../src/const/collections"
import {withTest, init, request} from "test-api-express-mongo/dist/api"
import {withIdBqt, withId, createObjectId} from "test-api-express-mongo/dist/domain"
import {replaceItem} from "test-api-express-mongo/dist/domain"

describe('PUT facet', function () {
    it('update facet', withTest({
        req: {
            url: `/api/facet`,
            method: "PUT",
            body: {...bleFacets[0], bqt: bleFacets[0].bqt * 2}
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
})
