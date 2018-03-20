import {oneModifiedResponse} from "../testCommonData";
import {remove} from "../../util/testIntegApp";
import {cols} from "../../../main/const/collections";
import {bleFacets} from "../../database/gateau";

export const facetDeletionSpec = {};

facetDeletionSpec.req = {
    body: {
        treeId: bleFacets._id,
        facetIds: [bleFacets.items[0]._id]
    }
};

facetDeletionSpec.res = {
    expected: oneModifiedResponse
};

facetDeletionSpec.db = {
    expected: {
        colname: cols.FACET,
        doc: remove(bleFacets, "items", {_id: bleFacets.items[0]._id})
    }
};