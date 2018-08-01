import {allreadyExistingFacetEntrySpec, postBadGrandeurFacetEntrySpec, postFacetEntrySpec} from "../../../spec/facetEntry/testPostFacetEntrySpec"
import {ObjectIDRegex} from "api-test/dist/domain"
import {init, request, run, withTest} from "api-test/dist/api"
import {assertDb} from "api-test/dist/db"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"

describe('POST FacetEntry', function () {

    beforeEach(init(api, ENV, cols))

    it('add new facet entry', withTest(postFacetEntrySpec))

    it('allreadyExistingFacetEntrySpec', withTest(allreadyExistingFacetEntrySpec))

    it('postBadGrandeurFacetEntrySpec', withTest(postBadGrandeurFacetEntrySpec))


})
