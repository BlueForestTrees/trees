import {peekFacetEntry} from "../service/facetEntry/getFacetEntryService";
import {getFacets} from "../service/facet/getFacetService";
import _ from 'lodash'

export const loadFacets = async trunkId => ({
    _id: trunkId,
    facets: await getFacets(trunkId).then(populateFacets)
});

const populateFacets = facets => facets ? Promise.all(
    _.map(facets.facets, facet =>
        peekFacetEntry(facet._id)
            .then(t => ({...facet, name: t.name}))
    )) : [];
