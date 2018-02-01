import {laFacet} from "../../scenario/integ/testIntegDatabase";
import {oneModifiedResponse} from "../testCommonData";
import {remove} from "../../testUtil";
import {cols} from "../../../main/const/collections";

export const facetDeletion = {};

facetDeletion.req = {
    body: {
        treeId: laFacet._id,
        facetIds: [laFacet.items[0]._id]
    }
};

facetDeletion.res = {
    expected: oneModifiedResponse
};

facetDeletion.db = {
    expected: {
        colname: cols.FACET,
        doc: remove(laFacet, "items", {_id: laFacet.items[0]._id})
    }
};