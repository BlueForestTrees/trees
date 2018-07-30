import {branchTreeSpec, noBranchsTreeSpec} from "../../../spec/branch/testGetBranchTreeSpec"
import {init, withTest} from "trees-test/dist/api"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"

describe('GET Branch Tree', function () {

    beforeEach(init(api, ENV, cols))

    it('return a branch tree', withTest(branchTreeSpec))

    it('return null', withTest(noBranchsTreeSpec))

})