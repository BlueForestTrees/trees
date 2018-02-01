import {laRoot} from "../../scenario/integ/testIntegDatabase";
import {oneModifiedResponse} from "../testCommonData";
import {remove} from "../../testUtil";
import {cols} from "../../../main/const/collections";

export const rootDeletion = {};

rootDeletion.req = {
    trunkId: laRoot._id,
    rootId: laRoot.items[0]._id
};

rootDeletion.res = {
    expected: oneModifiedResponse
};

rootDeletion.db = {
    expected: {
        colname: cols.ROOT,
        doc: remove(laRoot, "items", {_id: laRoot.items[0]._id})
    }
};