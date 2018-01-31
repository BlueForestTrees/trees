import {laFacet, nameOfFacet, trunkQtRootsQt} from "../../scenario/integ/testIntegDatabase";
import {clon} from "../../testUtil";
import _ from 'lodash';

export const getFacet = {};

const laFacetWithItsFacetEntryFields = _.forEach(clon(laFacet.items), facet => facet.name = nameOfFacet(facet._id));

getFacet.req = {
    _id: laFacet._id
};

getFacet.res = {
    body: {
        _id: getFacet.req._id,
        items: laFacetWithItsFacetEntryFields
    }
};


export const emptyGetFacet = {};

emptyGetFacet.req = {
    _id: trunkQtRootsQt._id
};

emptyGetFacet.res = {
    body: {
        _id: emptyGetFacet.req._id,
        items:[]
    }
};