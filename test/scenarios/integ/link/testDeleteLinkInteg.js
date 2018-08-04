import {assertDb} from "test-api-express-mongo/dist/db"
import {init, request, withTest} from "test-api-express-mongo/dist/api"
import {run} from "test-api-express-mongo/dist/api"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {rootDeletionSpec} from "../../../spec/root/testDeleteRootSpec"
import {branchDeletionSpec} from "../../../spec/branch/testDeleteBranchSpec"

describe('DELETE Link', function () {

    beforeEach(init(api, ENV, cols))

    it('delete the link', withTest({
        req: {...rootDeletionSpec.req, path: "/api/link"},
        res: {
            expected: [rootDeletionSpec.res.expected, branchDeletionSpec.res.expected]
        },
        db: {
            expected: {
                list: [rootDeletionSpec.db.expected, branchDeletionSpec.db.expected]
            }
        }
    }))

})