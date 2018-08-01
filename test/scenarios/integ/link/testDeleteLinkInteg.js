import {assertDb} from "api-test/dist/db"
import {init, request, withTest} from "api-test/dist/api"
import {run} from "api-test/dist/api"
import {linkDeletionSpec} from "../../../spec/link/testDeleteLinkSpec"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"

describe('DELETE Link', function () {

    beforeEach(init(api, ENV, cols))

    it('delete the link', withTest(linkDeletionSpec))

})