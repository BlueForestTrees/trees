import {assertDb} from "api-test/dist/db"
import {existingBranchPostSpec, newBranchSpec} from "../../../spec/branch/testPostBranchSpec"
import {run} from "api-test/dist/api"
import {init, request, withTest} from "api-test/dist/api"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"

describe('POST Branch', function () {

    beforeEach(init(api, ENV, cols))

    it('newBranch', withTest(newBranchSpec))

    it('existing branch', withTest(existingBranchPostSpec))
})