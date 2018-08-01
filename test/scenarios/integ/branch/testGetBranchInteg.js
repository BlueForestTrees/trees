import {badUnitGetBranchSpec, branchWithoutQtSpec, emptyGetBranchSpec, farine1000GGetBranchSpec, getBranchsSpec, otherUnitGetBranchSpec, sameQtGetBranchSpec} from "../../../spec/branch/testGetBranchSpec"
import {run, withTest, init, request} from "api-test/dist/api"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"

describe('GET Branch', function () {

    beforeEach(init(api, ENV, cols))

    it('return branchs', withTest(getBranchsSpec))

    it('return empty branchs', withTest(emptyGetBranchSpec))

    it('return an error because unit mismatch', withTest(badUnitGetBranchSpec))

    it('return branch with same quantity', withTest(sameQtGetBranchSpec))

    it('return branch with another quantity', withTest(farine1000GGetBranchSpec))

    it('return branch with another unit', withTest(otherUnitGetBranchSpec))

    it('return branch even with no qt in branchs', withTest(branchWithoutQtSpec))

})