import {vitCFacetEntry} from "../../database/facetEntries"
import {cols} from "../../../src/const/collections"
import {createStringObjectId} from "test-api-express-mongo/dist/util"
import {withError} from "test-api-express-mongo/dist/domain"

export const postFacetEntrySpec = {}
let _id = createStringObjectId()
postFacetEntrySpec.req = {
    url:"/api/facetEntry",
    method:"POST",
    body: {
        _id,
        name: "nomNewFacetEntry",
        grandeur: "Dens",
        color: "#FF0000"
    }
}
postFacetEntrySpec.db = {
    expected: {
        colname: cols.FACET_ENTRY,
        doc: {
            _id,
            name: "nomNewFacetEntry",
            grandeur: "Dens",
            color: "#FF0000",
            name_lower: "nomnewfacetentry"
        }
    }
}

export const postBadGrandeurFacetEntrySpec = {
    req: {
        method: "POST",
        url: "/api/facetEntry",
        body: {
            name: "nomNewFacetEntry",
            grandeur: "Dens   ité"
        }
    },
    res: {
        code: 400,
        bodypath: {path: "$.errors.grandeur.msg", value: "Invalid value"}
    }
}

export const allreadyExistingFacetEntrySpec = {
    req: {
        method: "POST",
        url: "/api/facetEntry",
        body: vitCFacetEntry
    }, res: {
        code: 400,
        body: withError(1,"allready exists")
    }
}
