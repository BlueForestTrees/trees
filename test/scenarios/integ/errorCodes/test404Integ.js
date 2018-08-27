import {init, withTest} from "test-api-express-mongo"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"

describe('POST fake address', function () {

    beforeEach(init(api, ENV, cols))

    it('valid confirm test', withTest({
        req: {
            url: "/fake/url/impossible/to/use"
        },
        res: {
            code: 404,
            body: null
        }
    }))


})