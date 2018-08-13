import {oneModifiedResponse} from "test-api-express-mongo/dist/domain"
import {assertDb} from "test-api-express-mongo/dist/db"
import {withTest, init, request} from "test-api-express-mongo/dist/api"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {bleFacets, farineTrunk} from "../../../database/gateau"
import {withIdBqt, withId} from "test-api-express-mongo/dist/domain"
import {prixFacetEntry, vitBFacetEntry} from "../../../database/facetEntries"
import {replaceItem} from "test-api-express-mongo/dist/domain"


describe('POST Facet', function () {

    beforeEach(init(api, ENV, cols))

    it('post new facet', withTest({
        req: {
            url: `/api/facet`,
            method: "POST",
            body: {
                trunk: withIdBqt(farineTrunk._id, 2000),
                facet: withIdBqt(prixFacetEntry._id, 144)
            }

        },
        res: {
            body: oneModifiedResponse

        },
        db: {
            expected: {
                colname: cols.FACET,
                doc: {
                    ...withIdBqt(farineTrunk._id, 2000),
                    items: [
                        withIdBqt(prixFacetEntry._id, 144)
                    ],

                }
            }
        }
    }))

    it('post another facet', withTest({
        req: {
            url: `/api/facet`,
            method: "POST",
            body: {
                trunk: withIdBqt(bleFacets._id, 10000),
                facet: withIdBqt(prixFacetEntry._id, 144)
            }

        },
        res: {
            body: oneModifiedResponse

        },
        db: {
            expected: {
                colname: cols.FACET,
                doc: {
                    ...withIdBqt(bleFacets._id, 10000),
                    items: [
                        ...bleFacets.items,
                        withIdBqt(prixFacetEntry._id, 144)
                    ],

                }
            }
        }
    }))





})