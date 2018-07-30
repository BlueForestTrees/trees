import {cols} from "../../const/collections"
import {col} from "trees-db-version/dist"
import {emptyGroup, withId} from "trees-query"
import _ from 'lodash'
import {removeQuantity} from "trees-query"
import {applyQuantity} from "../../util/calculations"

const facets = () => col(cols.FACET)

export const getFacet = _id =>
    facets()
        .findOne(withId(_id))
        .then(facet => _.isNil(facet) ? emptyGroup(_id) : facet)


export const loadFacet = _id =>
    getFacet(_id)
        .then(removeQuantity)


export const loadQuantifiedFacets = (qt, unit, _id) =>
    getFacet(_id)
        .then(facets => applyQuantity({qt, unit}, facets))