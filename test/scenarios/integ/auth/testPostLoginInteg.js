import {init, run, withTest} from "test-api-express-mongo/dist/api"
import {badLoginAuthentSpec, badPasswordAuthentSpec, validAuthentSpec} from "../../../spec/auth/postAuthentSpec"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"

describe('POST Auth', function () {

    beforeEach(init(api, ENV, cols))

    it('valid authent test', withTest(validAuthentSpec))

    it('bad password authent test', withTest(badPasswordAuthentSpec))

    it('bad login authent test', withTest(badLoginAuthentSpec))

})