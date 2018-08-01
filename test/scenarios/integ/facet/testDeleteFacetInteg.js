import {facetDeletionSpec} from "../../../spec/facet/testDeleteFacetSpec"
import {assertDb} from "test-api-express-mongo/dist/db"
import {init, request, withTest} from "test-api-express-mongo/dist/api"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
describe('DELETE Facet', function () {

    beforeEach(init(api, ENV, cols))

    it('delete the facet', withTest(facetDeletionSpec))

})