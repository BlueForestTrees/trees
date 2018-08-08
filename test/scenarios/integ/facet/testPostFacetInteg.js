import {oneModifiedResponse} from "test-api-express-mongo/dist/domain"
import {assertDb} from "test-api-express-mongo/dist/db"
import {withTest, init, request} from "test-api-express-mongo/dist/api"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {bleFacets, farineTrunk} from "../../../database/gateau"
import {withIdBqtG} from "test-api-express-mongo/dist/domain"
import {prixFacetEntry, vitBFacetEntry} from "../../../database/facetEntries"
import {replaceItem} from "test-api-express-mongo/dist/domain"


describe('POST Facet', function () {

    beforeEach(init(api, ENV, cols))

    it('firstFacet', withTest({
        req: {
            url: `/api/facet`,
            method: "POST",
            body: {
                trunk: withIdBqtG(farineTrunk._id, 2000, "Mass"),
                facet: withIdBqtG(prixFacetEntry._id, 144, "Surf")
            }

        },
        res: {
            body: oneModifiedResponse

        },
        db: {
            expected: {
                colname: cols.FACET,
                doc: {
                    ...withIdBqtG(farineTrunk._id, 2000, "Mass"),
                    items: [
                        withIdBqtG(prixFacetEntry._id, 144, "Surf")
                    ],

                }
            }
        }
    }))
    it('thirdFacet', withTest({
        req: {
            url: `/api/facet`,
            method: "POST",
            body: {
                trunk: withIdBqtG(bleFacets._id, 10000, "Mass"),
                facet: withIdBqtG(prixFacetEntry._id, 144, "Prix")
            }

        },
        res: {
            body: oneModifiedResponse

        },
        db: {
            expected: {
                colname: cols.FACET,
                doc: {
                    ...withIdBqtG(bleFacets._id, 10000, "Mass"),
                    items: [
                        ...bleFacets.items,
                        withIdBqtG(prixFacetEntry._id, 144, "Prix")
                    ],

                }
            }
        }
    }))
    it('updatingFacet', withTest({
        req: {
            url: `/api/facet`,
            method: "POST",
            body: {
                trunk: withIdBqtG(bleFacets._id, 5000, "Mass"),
                facet: withIdBqtG(vitBFacetEntry._id, 14, "Long")
            }
        },
        res: {
            body: oneModifiedResponse
        },
        db: {
            expected: {
                colname: cols.FACET,
                doc: replaceItem(bleFacets, "items", withIdBqtG(vitBFacetEntry._id, 28, "Long"))
            }
        }
    }))
})

