import {trunkDeletionSpec} from "../../../spec/trunk/testDeleteTrunkSpec";
import {init, request, withTest} from "trees-test/dist/api";
import api from "../../../../src";
import ENV from "../../../../src/env";
import {cols} from "../../../../src/const/collections";

describe('DELETE Trunks', function () {

    beforeEach(init(api, ENV, cols));

    it('delete the trunk', withTest(trunkDeletionSpec));

});