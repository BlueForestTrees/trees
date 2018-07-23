import {init, withTest} from "trees-test/dist/api";
import {branchDeletionSpec} from "../../../spec/branch/testDeleteBranchSpec";
import api from "../../../../src";
import ENV from "../../../../src/env";
import {cols} from "../../../../src/const/collections";

describe('DELETE branch', function () {

    beforeEach(init(api, ENV, cols));

    it('delete the branch', withTest(branchDeletionSpec));

});