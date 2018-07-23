import {peekFacetEntries} from "../service/facetEntry/getFacetEntryService";
import {getFacet} from "../service/facet/getFacetService";
import _ from 'lodash';
import {applyQuantity} from "../util/calculations";
import {removeQuantity} from "trees-query";

export const loadFacet = _id =>
    getFacet(_id)
        .then(addFacetEntryInfos)
        .then(removeQuantity);


export const loadQuantifiedFacets = (qt, unit, _id) =>
    getFacet(_id)
        .then(addFacetEntryInfos)
        .then(facets => applyQuantity({qt, unit}, facets));

const addFacetEntryInfos = async facet => {
    const infos = await peekFacetEntries(_.map(facet.items, "_id"));
    _.forEach(infos, e => {
        _.find(facet.items, {_id: e._id}).name = e.name;
        _.find(facet.items, {_id: e._id}).color = e.color;
    });
    return facet;
};
