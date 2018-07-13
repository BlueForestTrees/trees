import {init, withTest} from "../../../util/testIntegApp";
import {searchFacetEntrySpec} from "../../../spec/facetEntry/testGetFacetEntrySpec";


describe('GET FacetEntry', function () {

    beforeEach(init);

    it('search facet entry', withTest(searchFacetEntrySpec));

});