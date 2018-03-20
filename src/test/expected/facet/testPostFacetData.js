import {oneModifiedResponse} from "../testCommonData";
import {replaceItem} from "../../util/testIntegUtil";
import {cols} from "../../../main/const/collections";
import {bleFacets, farineTrunk} from "../../database/gateau";
import {prixFacetEntry, vitBFacetEntry} from "../../database/facetEntries";
import {withItem} from "../../util/testIntegUtil";

export const createFacetSpec = {};
createFacetSpec.req = {
    body: {
        trunk: withItem(farineTrunk._id, 2, "kg"),
        facet: withItem(prixFacetEntry._id, 144, "m2")
    }
};
createFacetSpec.res = {
    body: oneModifiedResponse
};
createFacetSpec.db = {
    expected: {
        colname: cols.FACET,
        doc: {
            ...withItem(farineTrunk._id, 2, "kg"),
            items: [
                withItem(prixFacetEntry._id, 144, "m2")
            ],

        }
    }
};

export const addingFacet = {};

addingFacet.req = {
    body: {
        trunk: withItem(bleFacets._id, 10, "kg"),
        facet: withItem(prixFacetEntry._id, 144, "€")
    }
};

addingFacet.res = {
    body: oneModifiedResponse
};

addingFacet.db = {
    expected: {
        colname: cols.FACET,
        doc: {
            ...withItem(bleFacets._id, 10, "kg"),
            items: [
                ...bleFacets.items,
                withItem(prixFacetEntry._id, 144, "€")
            ],

        }
    }
};


export const updatingBleFacetSpec = {};
updatingBleFacetSpec.req = {
    body: {
        trunk: withItem(bleFacets._id, 5, "kg"),
        facet: withItem(vitBFacetEntry._id, 14, "m")
    }
};
updatingBleFacetSpec.res = {
    body: oneModifiedResponse
};
updatingBleFacetSpec.db = {
    expected: {
        colname: cols.FACET,
        doc: replaceItem(bleFacets, "items", withItem(vitBFacetEntry._id, 28, "m"))
    }
};