import {init, testGet200BodyOk, withTest} from "trees-test/dist/api";
import {getImpactEntrySpec} from "../../../spec/impactEntry/testGetImpactEntrySpec";
import api from "../../../../src";
import ENV from "../../../../src/env";
import {cols} from "../../../../src/const/collections";

describe('GET Impacts entries', function () {

    beforeEach(init(api, ENV, cols));

    it('search facet entry', withTest(getImpactEntrySpec));

});