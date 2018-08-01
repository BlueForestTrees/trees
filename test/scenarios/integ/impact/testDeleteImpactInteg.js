import {impactDeletionSpec} from "../../../spec/impact/testDeleteImpactSpec"
import {assertDb} from "api-test/dist/db"
import {init, request, withTest} from "api-test/dist/api"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"

describe('DELETE Impact', function () {

    beforeEach(init(api, ENV, cols))

    it('delete the impact', withTest(impactDeletionSpec))

})