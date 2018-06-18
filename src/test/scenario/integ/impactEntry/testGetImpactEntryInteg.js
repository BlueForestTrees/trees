import {app} from "../../../../main";
import {init, testGet200BodyOk, withTest} from "../../../util/testIntegApp";
import {getImpactEntrySpec} from "../../../spec/impactEntry/testGetImpactEntrySpec";
import {searchFacetEntrySpec} from "../../../spec/facetEntry/testGetFacetEntrySpec";

describe('GET Impacts entries', function () {

    beforeEach(init);

    it('search facet entry', withTest(getImpactEntrySpec));

});