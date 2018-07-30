import {assertDb} from "trees-test/dist/db"
import {existingBranchPostSpec, newBranchSpec} from "../../../spec/branch/testPostBranchSpec"
import {run} from "trees-test/dist/api"
import {init, request, withTest} from "trees-test/dist/api"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"

describe('POST Branch', function () {

    beforeEach(init(api, ENV, cols))

    it('newBranch', withTest(newBranchSpec))

    it('existing branch', withTest(existingBranchPostSpec))
})