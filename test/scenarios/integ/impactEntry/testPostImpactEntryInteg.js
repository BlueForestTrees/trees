import {allreadyExistingImpactEntrySpec, postAdemeImpactEntryFileSpec, postBadGrandeurImpactEntrySpec, postBadIdImpactEntrySpec, postImpactEntrySpec} from "../../../spec/impactEntry/testPostImpactEntrySpec"
import {init, withTest} from "test-api-express-mongo/dist/api"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {createStringObjectId} from "test-api-express-mongo/dist/util"

const badImpactEntry = {
    _id: createStringObjectId() + "984",
    name: "nomNewImpactEntry",
    grandeur: "Dens",
    color: "#FFFFFF"
}

describe('POST ImpactEntry', function () {

    beforeEach(init(api, ENV, cols))

    it('normal post', withTest(postImpactEntrySpec))

    it('refuse bad id', withTest({
        req: {
            url: `/api/impactEntry`,
            method: "POST",
            body: badImpactEntry
        },
        res: {
            code: 400,
            bodypath: {path: "$.errors._id.msg", value: ["invalid mongo id"]}
        },
        db: {
            expected: {
                colname: cols.IMPACT_ENTRY,
                missingDoc: badImpactEntry
            }
        }
    }))

    it('refuse to post since same id exist', withTest(allreadyExistingImpactEntrySpec))

    it('postBadGrandeurImpactEntrySpec', withTest(postBadGrandeurImpactEntrySpec))

    it('post ademe impact file', withTest(postAdemeImpactEntryFileSpec))

})
