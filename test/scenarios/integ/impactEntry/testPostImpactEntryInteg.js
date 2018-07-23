import {allreadyExistingImpactEntrySpec, postBadGrandeurImpactEntrySpec, postImpactEntrySpec} from "../../../spec/impactEntry/testPostImpactEntrySpec";
import {init, withTest} from "trees-test/dist/api";
import api from "../../../../src";
import ENV from "../../../../src/env";
import {cols} from "../../../../src/const/collections";

describe('POST ImpactEntry', function () {

    beforeEach(init(api, ENV, cols));

    it('nouvelleImpactEntrySpec', withTest(postImpactEntrySpec));

    it('allreadyExistingImpactEntrySpec', withTest(allreadyExistingImpactEntrySpec));

    it('postBadGrandeurImpactEntrySpec', withTest(postBadGrandeurImpactEntrySpec));


});
