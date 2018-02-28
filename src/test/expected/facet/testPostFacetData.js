import {oneModifiedResponse, oneUpsertedResponse} from "../testCommonData";
import {replaceItem} from "../../util/testUtil";
import {cols} from "../../../main/const/collections";
import {bleFacets, farineTrunk} from "../../database/gateau";
import {prixFacetEntry, vitBFacetEntry} from "../../database/facetEntries";
import {withItem, withQuantity} from "../../testPlumbing";

export const firstFacetSpec = {};
firstFacetSpec.req = {
    _id: farineTrunk._id,
    body: {
        facet: withItem(prixFacetEntry._id, 144, "m2")
    }
};
firstFacetSpec.res = {
    body: oneUpsertedResponse(farineTrunk._id)
};
firstFacetSpec.db = {
    expected: {
        colname: cols.FACET,
        doc: {
            _id: farineTrunk._id,
            items: [
                withItem(prixFacetEntry._id, 144, "m2")
            ],

        }
    }
};

export const thirdFacet = {};
const trunkId = bleFacets._id;

thirdFacet.req = {
    _id: trunkId,
    body: {facet: withItem(prixFacetEntry._id, 144, "m2")}
};

thirdFacet.res = {
    body: oneModifiedResponse
};

thirdFacet.db = {
    expected: {
        colname: cols.FACET,
        doc: {
            _id: trunkId,
            ...withQuantity(10,"kg"),
            items: [
                ...bleFacets.items,
                withItem(prixFacetEntry._id, 144, "m2")
            ],

        }
    }
};


export const updatingBleFacetSpec = {};
updatingBleFacetSpec.req = {
    _id: bleFacets._id,
    body: {
        facet: withItem(vitBFacetEntry._id, 14, "m")
    }
};
updatingBleFacetSpec.res = {
    body: oneModifiedResponse
};
updatingBleFacetSpec.db = {
    expected: {
        colname: cols.FACET,
        doc: replaceItem(bleFacets, "items", withItem(vitBFacetEntry._id, 14, "m"))
    }
};