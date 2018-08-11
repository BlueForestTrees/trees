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


describe('POST FacetEntry', function () {

    beforeEach(init(api, ENV, cols))

    it('add new facet entry', withTest({
            req: {
                url: "/api/facetEntry",
                method: "POST",
                body: {
                    _id,
                    name: "nomNewFacetEntry",
                    g: "Dens",
                    color: "#FF0000"
                }
            },
            db: {
                expected: {
                    colname: cols.FACET_ENTRY,
                    doc: {
                        _id: object(_id),
                        name: "nomNewFacetEntry",
                        g: "Dens",
                        color: "#FF0000"
                    }
                }
            }
        }
    ))

    it('allreadyExistingFacetEntrySpec', withTest({
        req: {
            method: "POST",
            url: "/api/facetEntry",
            body: vitCFacetEntry
        }, res: {
            code: 400,
            body: withError(1,"allready exists")
        }
    }))

    it('postBadGrandeurFacetEntrySpec', withTest({
        req: {
            method: "POST",
            url: "/api/facetEntry",
            body: {
                name: "nomNewFacetEntry",
                g: "Dens   ité"
            }
        },
        res: {
            code: 400,
            bodypath: {path: "$.errors.g.msg", value: ["should be Mass, Dens, Long, Tran..."]}
        }
    }))


})
