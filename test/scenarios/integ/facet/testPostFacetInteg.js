import {oneInsertedResponse} from "test-api-express-mongo/dist/domain"
import {assertDb} from "test-api-express-mongo/dist/db"
import {createObjectId} from "test-api-express-mongo/dist/util"
import {withTest, init, request} from "test-api-express-mongo/dist/api"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {gateauTrunk} from "../../../database/gateau"
import {withIdBqt, withId} from "test-api-express-mongo/dist/domain"
import {vitEFacetEntry} from "../../../database/facetEntries"
import {replaceItem} from "test-api-express-mongo/dist/domain"

const facet = {_id: createObjectId(), trunkId: gateauTrunk._id, facetId: vitEFacetEntry._id, bqt: 85}

describe('POST Facet', function () {

    beforeEach(init(api, ENV, cols))

    it('post new facet', withTest({
        req: {
            url: `/api/facet`,
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

