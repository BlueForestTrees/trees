import {noUnitPutTrunkSpec, renameTrunkSpec, requantifyTrunkSpec} from "../../../spec/trunk/testPutTrunkSpec"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {init, withTest} from "api-test/dist/api"

describe('PUT Trunks', function () {

    beforeEach(init(api, ENV, cols))

    it('rename the trunk', withTest(renameTrunkSpec))
    it('quantify the trunk', withTest(requantifyTrunkSpec))
    it('put trunk quantity .missingUnit', withTest(noUnitPutTrunkSpec))

})