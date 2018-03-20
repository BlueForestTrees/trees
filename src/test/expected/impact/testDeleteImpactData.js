import {oneModifiedResponse} from "../testCommonData";
import {remove} from "../../util/testIntegApp";
import {cols} from "../../../main/const/collections";
import {bleImpacts} from "../../database/gateau";

export const impactDeletionSpec = {};

impactDeletionSpec.req = {
    body: {
        treeId: bleImpacts._id,
        impactIds: [bleImpacts.items[0]._id]
    }
};

impactDeletionSpec.res = {
    expected: oneModifiedResponse
};

impactDeletionSpec.db = {
    expected: {
        colname: cols.IMPACT,
        doc: remove(bleImpacts, "items", {_id: bleImpacts.items[0]._id})
    }
};