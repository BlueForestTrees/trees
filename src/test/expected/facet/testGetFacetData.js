import {bleFacets, farine, nameOfFacet} from "../../scenario/integ/testIntegDatabase";
import {clon} from "../../testUtil";
import _ from 'lodash';

export const getFacetSpec = {};

const laFacetWithItsFacetEntryFields = _.forEach(clon(bleFacets.items), facet => facet.name = nameOfFacet(facet._id));

getFacetSpec.req = {
    _id: bleFacets._id
};

getFacetSpec.res = {
    body: {
        _id: getFacetSpec.req._id,
        items: laFacetWithItsFacetEntryFields
    }
};


export const emptyGetFacetSpec = {};

emptyGetFacetSpec.req = {
    _id: farine._id
};

emptyGetFacetSpec.res = {
    body: {
        _id: emptyGetFacetSpec.req._id,
        items: []
    }
};