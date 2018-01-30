import {cols} from "../../../src/const/collections";
import {laFacet} from "../../scenario/integ/testIntegDatabase";
import {oneModifiedResponse} from "../testCommonData";
import {remove} from "../../testUtil";

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