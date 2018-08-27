import {oneInsertedResponse} from "test-api-express-mongo"
import {assertDb} from "test-api-express-mongo"
import {createObjectId} from "test-api-express-mongo"
import {withTest, init, request} from "test-api-express-mongo"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {gateauTrunk} from "../../../database/gateau"
import {withIdBqt, withId} from "test-api-express-mongo"
import {vitEFacetEntry} from "../../../database/facetEntries"
import {replaceItem} from "test-api-express-mongo"

const facet = {_id: createObjectId(), trunkId: gateauTrunk._id, facetId: vitEFacetEntry._id, bqt: 85}

describe('POST Facet', function () {

    beforeEach(init(api, ENV, cols))

    it('post new facet', withTest({
        req: {
            url: `/api/tree/facet`,
            method: "POST",
            body: facet

        },
        res: {
            body: oneInsertedResponse

        },
        db: {
            expected: {
                colname: cols.FACET,
                doc: facet
            }
        }
    }))
})

