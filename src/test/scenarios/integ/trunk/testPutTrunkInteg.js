import {noUnitPutTrunkSpec, renameTrunkSpec, requantifyTrunkSpec} from "../../../spec/trunk/testPutTrunkSpec";

import {app} from "../../../../main";
import {init, withTest} from "../../../util/testIntegApp";

describe('PUT Trunks', function () {

    beforeEach(init);

    it('rename the trunk', withTest(renameTrunkSpec));
    it('quantify the trunk', withTest(requantifyTrunkSpec));
    it('put trunk quantity .missingUnit', withTest(noUnitPutTrunkSpec));

});