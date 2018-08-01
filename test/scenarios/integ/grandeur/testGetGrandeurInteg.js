import {init, request, withTest} from "test-api-express-mongo/dist/api"
import {getGrandeurSpec} from "../../../spec/grandeur/testGetGrandeurSpec"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"

describe('GET Grandeurs', function () {

    beforeEach(init(api, ENV, cols))

    it('return grandeurs', withTest(getGrandeurSpec))

})