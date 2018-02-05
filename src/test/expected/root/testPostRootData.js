import {lait, gateauRoot, ble, farine, setQuantity, gateau, biere, capsule} from "../../scenario/integ/testIntegDatabase";
import {oneModifiedResponse, oneUpsertedResponse} from "../testCommonData";
import {clon} from "../../testUtil";
import {cols} from "../../../main/const/collections";

const biereId = biere._id;
const capsuleId = capsule._id;
export const newRoot = {};
newRoot.req = {
    body: {
        trunk: {
            _id: biereId
        },
        root: {
            _id: capsuleId
        }
    }
};
newRoot.res = {
    body: oneUpsertedResponse(biereId)
};
newRoot.db = {
    expected: {
        colname: cols.ROOT,
        doc: {
            _id: biereId,
            items: [
                {
                    _id: capsuleId
                }
            ],

        }
    }
};

const bleId = ble._id;
const farineId = farine._id;

export const existingIds = {};
existingIds.req = {
    body: {
        trunk: {
            _id: bleId
        },
        root: {
            _id: farineId
        }
    }
};
existingIds.res = {
    body: oneUpsertedResponse(bleId)
};
existingIds.db = {
    expected: {
        colname: cols.ROOT,
        doc: {
            _id: bleId,
            items: [
                {
                    _id: farineId
                }
            ],

        }
    }
};
