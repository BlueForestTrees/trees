import {bleFacets, nameOfFacet, gateau, farine} from "../../scenario/integ/testIntegDatabase";
import {clon} from "../../testUtil";
import _ from 'lodash';

export const getFacet = {};

const laFacetWithItsFacetEntryFields = _.forEach(clon(bleFacets.items), facet => facet.name = nameOfFacet(facet._id));

getFacet.req = {
    _id: bleFacets._id
};

getFacet.res = {
    body: {
        _id: getFacet.req._id,
        items: laFacetWithItsFacetEntryFields
    }
};


export const emptyGetFacet = {};

emptyGetFacet.req = {
    _id: farine._id
};

emptyGetFacet.res = {
    body: {
        _id: emptyGetFacet.req._id,
        items:[]
    }
};