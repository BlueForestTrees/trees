import { withTest} from "../../../util/testIntegApp";
import {putLinkRelativeToSpec, setQuantityLinkSpec, updateQuantityAnotherUnitLinkSpec, updateQuantityLinkSpec} from "../../../spec/link/testPutLinkSpec";
import {init} from "../../../util/testIntegApp";

describe('PUT Link', function () {

    beforeEach(init);

    it('set quantity with relativeTo', withTest(putLinkRelativeToSpec));
    it('set quantity', withTest(setQuantityLinkSpec));
    it('update quantity', withTest(updateQuantityLinkSpec));
    it('update quantity with another unit', withTest(updateQuantityAnotherUnitLinkSpec));
});