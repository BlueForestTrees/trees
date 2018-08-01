import {emptyGetImpactSpec, emptyQuantifiedGetImpactSpec, getImpactSpec, getQuantifiedImpactSpec} from "../../../spec/impact/testGetImpactSpec"
import {init, request, withTest} from "test-api-express-mongo/dist/api"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"

describe('GET Impacts', function () {

    beforeEach(init(api, ENV, cols))

    it('unquantified impacts', withTest(getImpactSpec))
    it('quantified impacts', withTest(getQuantifiedImpactSpec))
    it('unquantified empty impacts', withTest(emptyGetImpactSpec))
    it('quantified empty impacts', withTest(emptyQuantifiedGetImpactSpec))

})