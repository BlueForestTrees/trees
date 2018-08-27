import {init, withTest} from "test-api-express-mongo"
import {branchDeletionSpec} from "../../../spec/branch/testDeleteBranchSpec"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {farineBranch} from "../../../database/gateau"
import {oneModifiedResponse} from "test-api-express-mongo"

describe('DELETE branch', function () {

    beforeEach(init(api, ENV, cols))

    it('delete the branch', withTest({
        req: {
            method: "DELETE",
            path: "/api/tree/branch",
            param: `/${farineBranch[0]._id}`,
        }, res: {
            expected: oneModifiedResponse
        },
        db: {
            expected: {
                colname: cols.BRANCH,
                missingDoc: farineBranch[0]
            }
        }
    }))

})