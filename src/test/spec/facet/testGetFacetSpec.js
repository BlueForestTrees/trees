import {clon} from "../../util/testUtil";
import _ from 'lodash';
import {bleFacets} from "../../database/gateau";
import {nameOfFacet} from "../../util/testIntegDatabase";
import {withQuantity} from "../../util/testUtil";

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
    _id: "5a6a03c03e77667641d21234",
    qt: 15,
    unit: "g"
};

emptyGetFacetSpec.res = {
    body: {
        _id: emptyGetFacetSpec.req._id,
        items: []
    }
};

export const emptyQuantifiedGetFacetSpec = {};

emptyQuantifiedGetFacetSpec.req = {
    _id: "5a6a03c03e77667641d21234",
    qt: 15,
    unit: "g"
};

emptyQuantifiedGetFacetSpec.res = {
    body: {
        _id: emptyQuantifiedGetFacetSpec.req._id,
        ...withQuantity(15,"g"),
        items: []
    }
};


