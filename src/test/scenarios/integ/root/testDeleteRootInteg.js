import {rootDeletionSpec} from "../../../spec/root/testDeleteRootSpec";
import {app} from "../../../../main";
import {assertDb} from "../../../util/testIntegDatabase";import {init, request, withTest} from "../../../util/testIntegApp";
import {run} from "../../../util/testIntegApp";

describe('DELETE Root', function () {

    beforeEach(init);

    it('delete the root', withTest(rootDeletionSpec));

});