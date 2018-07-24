import _ from 'lodash';
import {vitCFacetEntry} from "../../database/facetEntries";
import {cols} from "../../../src/const/collections";

export const postFacetEntrySpec = {};
postFacetEntrySpec.req = {
    body: {
        _id: "152",
        name: "nomNewFacetEntry",
        grandeur: "Dens",
        color: "#FF0000"
    }
};
postFacetEntrySpec.db = {
    expected: {
        colname: cols.FACET_ENTRY,
        doc: {
            _id: "152",
            name: "nomNewFacetEntry",
            grandeur: "Dens",
            color: "#FF0000",
            name_lower: "nomnewfacetentry"
        }
    }
};

export const postBadGrandeurFacetEntrySpec = {
    req: {
        method: "POST",
        url: "/api/facetEntry",
        body: {
            name: "nomNewFacetEntry",
            grandeur: "Dens   ité"
        }
    },
    res: {
        code: 400,
        bodypath: {path: "$.errors.grandeur.msg", value: "Invalid value"}
    }
};


export const allreadyExistingFacetEntrySpec = {
    req: {
        method: "POST",
        url: "/api/facetEntry",
        body: {
            ..._.omit(vitCFacetEntry, "_id")
        }
    }, res: {
        code: 400,
        bodypath: {path: "$.errors.grandeur.msg", value: "Existe Déjà"}
    }
};
