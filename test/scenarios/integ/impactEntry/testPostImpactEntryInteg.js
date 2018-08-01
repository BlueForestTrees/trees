import {allreadyExistingImpactEntrySpec, postAdemeImpactFileSpec, postBadGrandeurImpactEntrySpec, postBadIdImpactEntrySpec, postImpactEntrySpec} from "../../../spec/impactEntry/testPostImpactEntrySpec"
import {init, withTest} from "test-api-express-mongo/dist/api"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"

describe('POST ImpactEntry', function () {

    beforeEach(init(api, ENV, cols))

    it('normal post', withTest(postImpactEntrySpec))

    it('refuse bad id', withTest(postBadIdImpactEntrySpec))

    it('refuse to post since same id exist', withTest(allreadyExistingImpactEntrySpec))

    it('postBadGrandeurImpactEntrySpec', withTest(postBadGrandeurImpactEntrySpec))

    it('post ademe impact file', withTest(postAdemeImpactFileSpec))

})
