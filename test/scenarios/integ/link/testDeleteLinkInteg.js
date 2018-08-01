import {assertDb} from "test-api-express-mongo/dist/db"
import {init, request, withTest} from "test-api-express-mongo/dist/api"
import {run} from "test-api-express-mongo/dist/api"
import {linkDeletionSpec} from "../../../spec/link/testDeleteLinkSpec"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"

describe('DELETE Link', function () {

    beforeEach(init(api, ENV, cols))

    it('delete the link', withTest(linkDeletionSpec))

})