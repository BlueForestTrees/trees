import {app} from "../../../../main";

import {init, withTest} from "../../../util/testIntegApp";
import {putRelativeToRootSpec, setQuantityRootSpec, updateQuantityAnotherUnitRootSpec, updateQuantityRootSpec} from "../../../spec/root/testPutRootSpec";

describe('PUT Root', function () {

    beforeEach(init);

    it('put root with quantity', withTest(setQuantityRootSpec));
    it('put root with relativeTo', withTest(putRelativeToRootSpec));
    it('update quantity', withTest(updateQuantityRootSpec));
    it('update quantity with another unit', withTest(updateQuantityAnotherUnitRootSpec));
});