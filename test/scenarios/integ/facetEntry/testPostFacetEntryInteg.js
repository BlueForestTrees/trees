import {allreadyExistingFacetEntrySpec, postBadGrandeurFacetEntrySpec, postFacetEntrySpec} from "../../../spec/facetEntry/testPostFacetEntrySpec"
import {ObjectIDRegex} from "trees-test/dist/domain"
import {init, request, run, withTest} from "trees-test/dist/api"
import {assertDb} from "trees-test/dist/db"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"

describe('POST FacetEntry', function () {

    beforeEach(init(api, ENV, cols))

    it('add new facet entry', withTest(postFacetEntrySpec))

    it('allreadyExistingFacetEntrySpec', withTest(allreadyExistingFacetEntrySpec))

    it('postBadGrandeurFacetEntrySpec', withTest(postBadGrandeurFacetEntrySpec))


})
