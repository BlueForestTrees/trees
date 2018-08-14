import {emptyGetFacetSpec, emptyQuantifiedGetFacetSpec, getFacetSpec, getQuantifiedFacetSpec} from "../../../spec/facet/testGetFacetSpec"
import {init, withTest} from "test-api-express-mongo/dist/api"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {bleFacets, bleTrunk} from "../../../database/gateau"
import {omit} from 'lodash'
import {withInfos} from "test-api-express-mongo/dist/db"
import {withBqtG, withoutQuantity, withQtCoef, withIdBqtG} from "test-api-express-mongo/dist/domain"
import {clon} from "test-api-express-mongo/dist/util"
import {vitBFacetEntry} from "../../../database/facetEntries"


describe('GET Facets', function () {

    beforeEach(init(api, ENV, cols))

    it('return facets', withTest({
        req: {
            url: `/api/facet/${bleTrunk._id}`
        },
        res: {
            bodypath: [
                {path: "$[0]._id", value: bleFacets[0]._id},
                {path: "$[1]._id", value: bleFacets[1]._id},
                {path: "$[1].name", value: vitBFacetEntry.name},
                {path: "$[1].color", value: vitBFacetEntry.color},
                {path: "$[1].quantity.bqt", value: bleFacets[1].bqt},
                {path: "$[1].quantity.g", value: vitBFacetEntry.g},
            ]
        }
    }))

    it('return empty facets', withTest({
        req: {
            url: `/api/facet/${"5a6a03c03e77667641d21234"}`,
        },
        res: {
            body: []
        }
    }))

})