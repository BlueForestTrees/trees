import {assertDb} from "test-api-express-mongo/dist/db"
import {existingBranchPostSpec, newBranchSpec} from "../../../spec/branch/testPostBranchSpec"
import {run} from "test-api-express-mongo/dist/api"
import {init, request, withTest} from "test-api-express-mongo/dist/api"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"

describe('POST Branch', function () {

    beforeEach(init(api, ENV, cols))

    it('newBranch', withTest(newBranchSpec))

    it('existing branch', withTest(existingBranchPostSpec))
})