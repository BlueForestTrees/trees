import {allreadyExistingImpactEntrySpec, postAdemeImpactEntryFileSpec, postBadGrandeurImpactEntrySpec, postBadIdImpactEntrySpec, postImpactEntrySpec} from "../../../spec/impactEntry/testPostImpactEntrySpec"
import {init, withTest} from "test-api-express-mongo"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {createStringObjectId, createObjectId} from "test-api-express-mongo"
import {co2eImpactEntry} from "../../../database/impactEntries"
import {withError} from "test-api-express-mongo"


const badImpactEntry = {_id: createStringObjectId() + "984"}
const impactEntry = {_id: createObjectId(),name: "nomNewImpactEntry",g: "Dens",color: "#FFFFFF"}

describe('POST ImpactEntry', function () {

    beforeEach(init(api, ENV, cols))

    it('post new impact entry', withTest({
        req: {
            url: `/api/tree/impactEntry`,
            method: "POST",
            body: impactEntry
        },
        db: {
            expected: {
                colname: cols.IMPACT_ENTRY,
                doc: impactEntry
            }
        }
    }))

    it('post existing facet entry', withTest({
        req: {
            method: "POST",
            url: "/api/tree/impactEntry",
            body: co2eImpactEntry
        }, res: {
            code: 400,
            body: withError(1,"allready exists")
        }
    }))

    it('refuse to create a bad impact entry', withTest({
        req: {
            url: "/api/tree/facetEntry",
            method: "POST",
            body: badImpactEntry
        },
        res: {
            code: 400,
            bodypath: [
                {path: "$.errors.g.msg", value: "should be Mass, Dens, Long, Tran..."},
                {path: "$.errors.name.msg", value: "Invalid value"},
                {path: "$.errors.color.msg", value: "Invalid value"},
                {path: "$.errors._id.msg", value: "invalid mongo id"},
            ]
        },
        db: {
            expected: {
                colname: cols.TRUNK,
                missingDoc: badImpactEntry
            }
        }
    }))

})
