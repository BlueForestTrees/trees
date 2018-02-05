import {gateauRoot} from "../../scenario/integ/testIntegDatabase";
import {oneModifiedResponse} from "../testCommonData";
import {remove} from "../../testUtil";
import {cols} from "../../../main/const/collections";

export const rootDeletion = {};

rootDeletion.req = {
    trunkId: gateauRoot._id,
    rootId: gateauRoot.items[0]._id
};

rootDeletion.res = {
    expected: oneModifiedResponse
};

rootDeletion.db = {
    expected: {
        colname: cols.ROOT,
        doc: remove(gateauRoot, "items", {_id: gateauRoot.items[0]._id})
    }
};