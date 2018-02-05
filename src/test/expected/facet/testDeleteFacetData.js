import {bleFacets} from "../../scenario/integ/testIntegDatabase";
import {oneModifiedResponse} from "../testCommonData";
import {remove} from "../../testUtil";
import {cols} from "../../../main/const/collections";

export const facetDeletion = {};

facetDeletion.req = {
    body: {
        treeId: bleFacets._id,
        facetIds: [bleFacets.items[0]._id]
    }
};

facetDeletion.res = {
    expected: oneModifiedResponse
};

facetDeletion.db = {
    expected: {
        colname: cols.FACET,
        doc: remove(bleFacets, "items", {_id: bleFacets.items[0]._id})
    }
};