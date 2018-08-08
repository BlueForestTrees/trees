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
                items: withInfos(cols.FACET_ENTRY, withoutQuantity(clon(bleFacets.items)))
            })
        }
    }))
    it('return quantified facets', withTest({
        req: {
            url: `/api/facet/5000/Mass/${bleFacets._id}`,
        },
        res: {
            body: () => ({
                ...withIdBqtG(bleFacets._id, 5000, "Mass"),
                items: withInfos(cols.FACET_ENTRY, withQtCoef(bleFacets.items,0.5))
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
    it('return quantified empty facets', withTest({
        req: {
            url: `/api/facet/15/Mass/${"5a6a03c03e77667641d21234"}`,
        },
        res: {
            body: {
                _id: "5a6a03c03e77667641d21234",
                ...withBqtG(15, "Mass"),
                items: []
            }
        }
    }))

})