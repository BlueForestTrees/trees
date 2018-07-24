import {emptyGetFacetSpec, emptyQuantifiedGetFacetSpec, getFacetSpec, getQuantifiedFacetSpec} from "../../../spec/facet/testGetFacetSpec";
import {init, withTest} from "trees-test/dist/api";
import api from "../../../../src";
import ENV from "../../../../src/env";
import {cols} from "../../../../src/const/collections";

describe('GET Facets', function () {

    beforeEach(init(api, ENV, cols));

    it('return facets', withTest(getFacetSpec));
    it('return quantified facets', withTest(getQuantifiedFacetSpec));
    it('return empty facets', withTest(emptyGetFacetSpec));
    it('return quantified empty facets', withTest(emptyQuantifiedGetFacetSpec));

});