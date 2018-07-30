import {assertDb} from "trees-test/dist/db"
import {init, request, withTest} from "trees-test/dist/api"
import {run} from "trees-test/dist/api"
import {linkDeletionSpec} from "../../../spec/link/testDeleteLinkSpec"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"

describe('DELETE Link', function () {

    beforeEach(init(api, ENV, cols))

    it('delete the link', withTest(linkDeletionSpec))

})