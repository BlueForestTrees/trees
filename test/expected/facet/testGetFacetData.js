import {laFacet, leftTrunk, nameOfFacet, trunkQtRootsQt} from "../../scenario/integ/testIntegDatabase";
import {clon} from "../../testUtil";
import _ from 'lodash';

export const getFacet = {};

const laFacetWithItsTrunkFields = _.forEach(clon(laFacet.facets), facet => facet.name = nameOfFacet(facet._id));

getFacet.req = {
    _id: laFacet._id
};

getFacet.res = {
    body: {
        _id: getFacet.req._id,
        facets: laFacetWithItsTrunkFields
    }
};


export const emptyGetFacet = {};

emptyGetFacet.req = {
    _id: trunkQtRootsQt._id
};

emptyGetFacet.res = {
    body: {
        _id: emptyGetFacet.req._id,
        facets:[]
    }
};