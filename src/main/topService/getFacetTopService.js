import {peekFacetEntries} from "../service/facetEntry/getFacetEntryService";
import {getFacet} from "../service/facet/getFacetService";
import _ from 'lodash';
import {applyQuantity} from "../util/calculations";
import {removeQuantity} from "../util/query";

export const loadFacet = _id =>
    getFacet(_id)
        .then(populateFacetNames)
        .then(removeQuantity);

const populateFacetNames = async facet => {
    const names = await peekFacetEntries(_.map(facet.items, "_id"));
    _.forEach(names, e => {
        _.find(facet.items, {_id: e._id}).name = e.name;
    });
    return facet;
};

export const loadQuantifiedFacets = (qt, unit, _id) =>
    getFacet(_id)
        .then(populateFacetNames)
        .then(facets => applyQuantity({qt, unit}, facets));
