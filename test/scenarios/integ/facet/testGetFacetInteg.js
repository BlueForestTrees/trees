import {emptyGetFacetSpec, emptyQuantifiedGetFacetSpec, getFacetSpec, getQuantifiedFacetSpec} from "../../../spec/facet/testGetFacetSpec"
import {init, withTest} from "test-api-express-mongo/dist/api"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {bleFacets} from "../../../database/gateau"
import {omit} from 'lodash'
import {withInfos} from "test-api-express-mongo/dist/db"
import {withBqtG, withoutQuantity, withQtCoef, withIdBqtG} from "test-api-express-mongo/dist/domain"
import {clon} from "test-api-express-mongo/dist/util"


describe('GET Facets', function () {

    beforeEach(init(api, ENV, cols))

    it('return facets', withTest({
        req: {
            url: `/api/facet/${bleFacets._id}`
        },
        res: {
            body: () => ({
                ...omit(bleFacets, ['items', 'quantity']),
                items: withInfos(cols.FACET_ENTRY, bleFacets.items)
            })
        }
    }))

    it('return empty facets', withTest({
        req: {
            url: `/api/facet/${"5a6a03c03e77667641d21234"}`,
        },
        res: {
            body: {
                _id: "5a6a03c03e77667641d21234",
                items: []
            }
        }
    }))

})