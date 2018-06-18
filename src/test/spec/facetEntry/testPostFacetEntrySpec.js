import _ from 'lodash';
import {vitCFacetEntry} from "../../database/facetEntries";
import {cols} from "../../../main/const/collections";

export const postFacetEntrySpec = {};
postFacetEntrySpec.req = {
    body: {
        name: "nomNewFacetEntry",
        grandeur: "Dens",
        color: "#FF0000"
    }
};
postFacetEntrySpec.res = {
    body: _id => ({_id})
};
postFacetEntrySpec.db = {
    expected: _id => ({
        colname: cols.FACET_ENTRY,
        doc: {
            _id,
            name: "nomNewFacetEntry",
            grandeur: "Dens",
            color: "#FF0000",
            name_lower: "nomnewfacetentry"
        }
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
    status: 422,
    bodyMessage: "Invalid value"
};


export const allreadyExistingFacetEntrySpec = {};
allreadyExistingFacetEntrySpec.req = {
    body: {
        ..._.omit(vitCFacetEntry, "_id")
    }
};
allreadyExistingFacetEntrySpec.res = {
    body: _id => ({_id})
};