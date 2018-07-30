import {init, run, withTest} from "trees-test/dist/api"
import {validConfirmSpec} from "../../../spec/auth/postConfirmSpec"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"

describe('POST Confirm', function () {

    beforeEach(init(api, ENV, cols))

    it('valid confirm test', withTest(validConfirmSpec))


})