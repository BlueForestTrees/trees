import {clon} from "trees-test/dist/util"
import _ from 'lodash'
import {bleFacets, gateauRoot} from "../../database/gateau"
import {withQuantity} from "trees-test/dist/domain"
import {cols} from "../../../src/const/collections"
import {omit} from 'lodash';
import {withInfos} from "trees-test/dist/db"
import {withoutQuantity} from "trees-test/dist/domain"

export const getFacetSpec = {
    req: {
        url: `/api/facet/${bleFacets._id}`
    },
    res: {
        body: () => ({
            ...omit(bleFacets, ['items','quantity']),
            items: withInfos(cols.FACET_ENTRY, withoutQuantity(clon(bleFacets.items)))
        })
    }
}


const resultItems = _.forEach(clon(bleFacets.items), facet => {
    facet.quantity.qt *= 0.5
})
export const getQuantifiedFacetSpec = {
    req: {
        url: `/api/facet/5000/g/${bleFacets._id}`,
    },
    res: {
        body: () => ({
            _id: bleFacets._id,
            ...withQuantity(5000, "g"),
            items: withInfos(cols.FACET_ENTRY, clon(resultItems))
        })
    }
}


export const emptyGetFacetSpec = {
    req: {
        url: `/api/facet/${"5a6a03c03e77667641d21234"}`,
    },
    res: {
        body: {
            _id: "5a6a03c03e77667641d21234",
            items: []
        }
    }
}

export const emptyQuantifiedGetFacetSpec = {
    req: {
        url: `/api/facet/15/g/${"5a6a03c03e77667641d21234"}`,
    },
    res: {
        body: {
            _id: "5a6a03c03e77667641d21234",
            ...withQuantity(15, "g"),
            items: []
        }
    }
}

