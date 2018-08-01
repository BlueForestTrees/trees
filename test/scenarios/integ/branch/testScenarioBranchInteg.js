import {deleteBleBranchFarineSpec} from "../../../spec/branch/testDeleteBranchSpec"
import {farineToBleBranchAddSpec} from "../../../spec/branch/testPostBranchSpec"
import {deleteBranch} from "./testDeleteBranchInteg"
import {run, withTest} from "test-api-express-mongo/dist/api"
import {init} from "test-api-express-mongo/dist/api"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"

describe('SCENARIO Branch', function () {

    beforeEach(init(api, ENV, cols))

    it('suppr puis réajout de la farine au blé',
        withTest([
            deleteBleBranchFarineSpec,
            farineToBleBranchAddSpec
        ])
    )
})

