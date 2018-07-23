import {init, withTest} from "trees-test/dist/api";
import {searchFacetEntrySpec} from "../../../spec/facetEntry/testGetFacetEntrySpec";
import api from "../../../../src";
import ENV from "../../../../src/env";
import {cols} from "../../../../src/const/collections";

describe('GET FacetEntry', function () {

    beforeEach(init(api, ENV, cols));

    it('search facet entry', withTest(searchFacetEntrySpec));

});