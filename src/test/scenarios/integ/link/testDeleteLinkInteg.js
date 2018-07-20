import {app} from "../../../../main";
import {assertDb} from "../../../util/testIntegDatabase";import {init, request, withTest} from "../../../util/testIntegApp";
import {run} from "../../../util/testIntegApp";
import {linkDeletionSpec} from "../../../spec/link/testDeleteLinkSpec";

describe('DELETE Link', function () {

    beforeEach(init);

    it('delete the link', withTest(linkDeletionSpec));

});