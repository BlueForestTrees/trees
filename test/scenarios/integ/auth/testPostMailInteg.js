import {init, withTest} from "test-api-express-mongo/dist/api"
import {existingPostMailSpec, invalidPostMailSpec, validPostMailSpec} from "../../../spec/auth/postMailSpec"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"

describe('POST Mail', function () {

    beforeEach(init(api, ENV, cols))

    it('valid mail test', withTest(validPostMailSpec))

    it('existing mail test', withTest(existingPostMailSpec))

    it('invalid mail test', withTest(invalidPostMailSpec))

})