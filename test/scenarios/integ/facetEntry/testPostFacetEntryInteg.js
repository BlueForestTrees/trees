import {ObjectIDRegex} from "test-api-express-mongo/dist/domain"
import {init, request, run, withTest} from "test-api-express-mongo/dist/api"
import {assertDb} from "test-api-express-mongo/dist/db"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {createStringObjectId, object} from "test-api-express-mongo/dist/util"
import {vitCFacetEntry} from "../../../database/facetEntries"
import {withError} from "test-api-express-mongo/dist/domain"

const _id = createStringObjectId()
const facetEntry = {_id: object(_id), name: "nomNewFacetEntry", g: "Dens", color: "#FF0000"}
const badFacet = {_id: "XXX" + createStringObjectId() + "XXX", color: "#FF00", g: "ass"}

describe('POST FacetEntry', function () {

    beforeEach(init(api, ENV, cols))

    it('post new facet entry', withTest({
            req: {
                url: "/api/facetEntry",
                method: "POST",
                body: facetEntry,
            },
            db: {
                expected: {
                    colname: cols.FACET_ENTRY,
                    doc: facetEntry
                }
            }
        }
    ))

    it('post existing facet entry', withTest({
        req: {
            method: "POST",
            url: "/api/facetEntry",
            body: vitCFacetEntry
        }, res: {
            code: 400,
            body: withError(1,"allready exists")
        }
    }))

    it('refuse to create a bad facet entry', withTest({
        req: {
            url: "/api/facetEntry",
            method: "POST",
            body: badFacet
        },
        res: {
            code: 400,
            bodypath: [
                {path: "$.errors.g.msg", value: "should be Mass, Dens, Long, Tran..."},
                {path: "$.errors.name.msg", value: "Invalid value"},
                {path: "$.errors.color.msg", value: "Invalid value"},
                {path: "$.errors.color.value", value: "#FF00"},
                {path: "$.errors._id.msg", value: "invalid mongo id"},
            ]
        },
        db: {
            expected: {
                colname: cols.TRUNK,
                missingDoc: badFacet
            }
        }
    }))


})
