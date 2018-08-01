import {init, request, withTest} from "test-api-express-mongo/dist/api"
import {setQuantityBranchSpec, updateQuantityAnotherUnitBranchSpec, updateQuantityBranchSpec} from "../../../spec/branch/testPutBranchSpec"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"

describe('PUT Branch', function () {

    beforeEach(init(api, ENV, cols))

    it('set quantity', withTest(setQuantityBranchSpec))
    it('update quantity', withTest(updateQuantityBranchSpec))
    it('differentUnit', withTest(updateQuantityAnotherUnitBranchSpec))
})