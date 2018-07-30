import {facetDeletionSpec} from "../../../spec/facet/testDeleteFacetSpec"
import {assertDb} from "trees-test/dist/db"
import {init, request, withTest} from "trees-test/dist/api"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
describe('DELETE Facet', function () {

    beforeEach(init(api, ENV, cols))

    it('delete the facet', withTest(facetDeletionSpec))

})