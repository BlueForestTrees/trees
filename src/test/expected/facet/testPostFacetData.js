import {oneModifiedResponse, oneUpsertedResponse} from "../testCommonData";
import {replaceItem} from "../../util/testUtil";
import {cols} from "../../../main/const/collections";
import {bleFacets, farine} from "../../database/gateau";
import {prixFacetEntry, vitBFacetEntry} from "../../database/facetEntries";
import {withIdQuantity} from "../../testPlumbing";

export const firstFacetSpec = {};
firstFacetSpec.req = {
    _id: farine._id,
    body: {
        facet: withIdQuantity(prixFacetEntry._id, 144, "m2")
    }
};
firstFacetSpec.res = {
    body: oneUpsertedResponse(farine._id)
};
firstFacetSpec.db = {
    expected: {
        colname: cols.FACET,
        doc: {
            _id: farine._id,
            items: [
                withIdQuantity(prixFacetEntry._id, 144, "m2")
            ],

        }
    }
};

export const thirdFacet = {};
const trunkId = bleFacets._id;

thirdFacet.req = {
    _id: trunkId,
    body: {facet: withIdQuantity(prixFacetEntry._id, 144, "m2")}
};

thirdFacet.res = {
    body: oneModifiedResponse
};

thirdFacet.db = {
    expected: {
        colname: cols.FACET,
        doc: {
            _id: trunkId,
            items: [
                ...bleFacets.items,
                withIdQuantity(prixFacetEntry._id, 144, "m2")
            ],

        }
    }
};


export const updatingBleFacetSpec = {};
updatingBleFacetSpec.req = {
    _id: bleFacets._id,
    body: {
        facet: withIdQuantity(vitBFacetEntry._id, 14, "m")
    }
};
updatingBleFacetSpec.res = {
    body: oneModifiedResponse
};
updatingBleFacetSpec.db = {
    expected: {
        colname: cols.FACET,
        doc: replaceItem(bleFacets, "items", withIdQuantity(vitBFacetEntry._id, 14, "m"))
    }
};