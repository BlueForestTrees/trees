import {init, withTest} from "test-api-express-mongo/dist/api"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {vitBFacetEntry, vitCFacetEntry, vitDFacetEntry, vitEFacetEntry} from "../../../database/facetEntries"
import {omit} from 'lodash'
import {notInSearchMixin} from "test-api-express-mongo/dist/domain"

describe('GET FacetEntry', function () {

    beforeEach(init(api, ENV, cols))

    it('search facet entry', withTest({
        req: {
            url: "/api/facetEntry?q=Vitami"
        },
        res: {
            body: [
                omit(vitBFacetEntry, notInSearchMixin),
                omit(vitCFacetEntry, notInSearchMixin),
                omit(vitDFacetEntry, notInSearchMixin),
                omit(vitEFacetEntry, notInSearchMixin),
            ]
        }
    }))

})