import {oneModifiedResponse} from "test-api-express-mongo/dist/domain"
import {vitBFacetEntry} from "../../../database/facetEntries"
import {bleFacets} from "../../../database/gateau"
import {cols} from "../../../../src/const/collections"
import {withTest, init, request} from "test-api-express-mongo/dist/api"
import {withIdBqt, withId} from "test-api-express-mongo/dist/domain"
import {replaceItem} from "test-api-express-mongo/dist/domain"

describe('PUT facet', function () {
    it('update facet', withTest({
        req: {
            url: `/api/facet`,
            method: "PUT",
            body: {
                trunk: withId(bleFacets._id),
                facet: withIdBqt(vitBFacetEntry._id, 14)
            }
        },
        res: {
            body: oneModifiedResponse
        },
        db: {
            expected: {
                colname: cols.FACET,
                doc: replaceItem(bleFacets, "items", withIdBqt(vitBFacetEntry._id, 28))
            }
        }
    }))
})
