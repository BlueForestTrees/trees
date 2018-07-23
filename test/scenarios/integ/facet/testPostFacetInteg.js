import {createFacetSpec, addingFacet, updatingBleFacetSpec} from "../../../spec/facet/testPostFacetSpec";
import {assertDb} from "trees-test/dist/db";
import {withTest, init, request} from "trees-test/dist/api";
import api from "../../../../src";
import ENV from "../../../../src/env";
import {cols} from "../../../../src/const/collections";

describe('POST Facet', function () {

    beforeEach(init(api, ENV, cols));

    it('firstFacet', withTest(createFacetSpec));
    it('thirdFacet', withTest(addingFacet));
    it('updatingFacet', withTest(updatingBleFacetSpec));
});

