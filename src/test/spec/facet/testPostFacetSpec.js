import {oneModifiedResponse} from "../testCommonSpec";
import {replaceItem} from "../../util/testUtil";
import {cols} from "../../../main/const/collections";
import {bleFacets, farineTrunk} from "../../database/gateau";
import {prixFacetEntry, vitBFacetEntry} from "../../database/facetEntries";
import {withIdQuantity} from "../../util/testUtil";

export const createFacetSpec = {};
createFacetSpec.req = {
    body: {
        trunk: withIdQuantity(farineTrunk._id, 2, "kg"),
        facet: withIdQuantity(prixFacetEntry._id, 144, "m2")
    }
};
createFacetSpec.res = {
    body: oneModifiedResponse
};
createFacetSpec.db = {
    expected: {
        colname: cols.FACET,
        doc: {
            ...withIdQuantity(farineTrunk._id, 2, "kg"),
            items: [
                withIdQuantity(prixFacetEntry._id, 144, "m2")
            ],

        }
    }
};

export const addingFacet = {};

addingFacet.req = {
    body: {
        trunk: withIdQuantity(bleFacets._id, 10, "kg"),
        facet: withIdQuantity(prixFacetEntry._id, 144, "€")
    }
};

addingFacet.res = {
    body: oneModifiedResponse
};

addingFacet.db = {
    expected: {
        colname: cols.FACET,
        doc: {
            ...withIdQuantity(bleFacets._id, 10, "kg"),
            items: [
                ...bleFacets.items,
                withIdQuantity(prixFacetEntry._id, 144, "€")
            ],

        }
    }
};


export const updatingBleFacetSpec = {};
updatingBleFacetSpec.req = {
    body: {
        trunk: withIdQuantity(bleFacets._id, 5, "kg"),
        facet: withIdQuantity(vitBFacetEntry._id, 14, "m")
    }
};
updatingBleFacetSpec.res = {
    body: oneModifiedResponse
};
updatingBleFacetSpec.db = {
    expected: {
        colname: cols.FACET,
        doc: replaceItem(bleFacets, "items", withIdQuantity(vitBFacetEntry._id, 28, "m"))
    }
};