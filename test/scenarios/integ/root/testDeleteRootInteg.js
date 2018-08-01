import {rootDeletionSpec} from "../../../spec/root/testDeleteRootSpec"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {assertDb} from "test-api-express-mongo/dist/db"
import {init, request, withTest} from "test-api-express-mongo/dist/api"
import {run} from "test-api-express-mongo/dist/api"

describe('DELETE Root', function () {

    beforeEach(init(api, ENV, cols))

    it('delete the root', withTest(rootDeletionSpec))

})