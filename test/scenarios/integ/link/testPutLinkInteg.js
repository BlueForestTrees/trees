import {withTest} from "test-api-express-mongo/dist/api"
import {putLinkRelativeToSpec, setQuantityLinkSpec, updateQuantityAnotherUnitLinkSpec, updateQuantityLinkSpec} from "../../../spec/link/testPutLinkSpec"
import {init} from "test-api-express-mongo/dist/api"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"

describe('PUT Link', function () {

    beforeEach(init(api, ENV, cols))

    it('set quantity with relativeTo', withTest(putLinkRelativeToSpec))
    it('set quantity', withTest(setQuantityLinkSpec))
    it('update quantity', withTest(updateQuantityLinkSpec))
    it('update quantity with another unit', withTest(updateQuantityAnotherUnitLinkSpec))
})