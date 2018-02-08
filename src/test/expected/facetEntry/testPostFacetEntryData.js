import {vitCFacetEntry} from "../../scenario/integ/testIntegDatabase";

import _ from 'lodash';

export const postFacetEntrySpec = {};
postFacetEntrySpec.req = {
    body: {
        name: "nomNewFacetEntry",
        grandeur: "Densité"
    }
};
postFacetEntrySpec.res = {
    body : _id => ({
        _id,
        name: "nomNewFacetEntry",
        grandeur: "Densité"
    })
};

export const postBadGrandeurFacetEntrySpec = {};
postBadGrandeurFacetEntrySpec.req = {
    body: {
        name: "nomNewFacetEntry",
        grandeur: "Dens   ité"
    }
};
postBadGrandeurFacetEntrySpec.res = {
    status : 422,
    bodyMessage : "Invalid value"
};


export const allreadyExistingFacetEntrySpec = {};
allreadyExistingFacetEntrySpec.req = {
    body: {
        ..._.omit(vitCFacetEntry,"_id")
    }
};
allreadyExistingFacetEntrySpec.res = {
    body : vitCFacetEntry
};