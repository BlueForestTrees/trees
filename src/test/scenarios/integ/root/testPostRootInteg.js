import {existingRootPostSpec, newRootSpec} from "../../../spec/root/testPostRootSpec";
import {app} from "../../../../main";
import {run, withTest} from "../../../util/testIntegApp";
import {init} from "../../../util/testIntegApp";

describe('POST Root', function () {

    beforeEach(init);

    it('newRoot', withTest(newRootSpec));

    it('existing root', withTest(existingRootPostSpec));
});