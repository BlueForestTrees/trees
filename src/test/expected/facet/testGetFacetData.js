import {clon} from "../../util/testUtil";
import _ from 'lodash';
import {bleFacets, farine} from "../../database/gateau";
import {nameOfFacet} from "../../testIntegDatabase";
import {withQuantity} from "../../testPlumbing";

export const getFacetSpec = {};

const laFacetWithItsFacetEntryFields = _.forEach(clon(bleFacets.items), facet => {
    facet.name = nameOfFacet(facet._id);
    delete facet.quantity;
});

getFacetSpec.req = {
    _id: bleFacets._id
};

getFacetSpec.res = {
    body: {
        _id: getFacetSpec.req._id,
        items: laFacetWithItsFacetEntryFields
    }
};

export const getQuantifiedFacetSpec = {};

const resultItems = _.forEach(clon(bleFacets.items), facet => {
    facet.name = nameOfFacet(facet._id);
    facet.quantity.qt *= 0.5;
});

getQuantifiedFacetSpec.req = {
    _id: bleFacets._id,
    qt: 5000,
    unit: "g"
};

getQuantifiedFacetSpec.res = {
    body: {
        _id: getFacetSpec.req._id,
        ...withQuantity(5000,"g"),
        items: resultItems
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


