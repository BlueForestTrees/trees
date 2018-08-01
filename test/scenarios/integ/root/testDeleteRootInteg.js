import {rootDeletionSpec} from "../../../spec/root/testDeleteRootSpec"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {assertDb} from "api-test/dist/db"
import {init, request, withTest} from "api-test/dist/api"
import {run} from "api-test/dist/api"

describe('DELETE Root', function () {

    beforeEach(init(api, ENV, cols))

    it('delete the root', withTest(rootDeletionSpec))

})