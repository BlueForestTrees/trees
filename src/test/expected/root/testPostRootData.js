import {oneModifiedResponse, oneUpsertedResponse} from "../testCommonData";
import {cols} from "../../../main/const/collections";
import {biere, capsule} from "../../database/biere";
import {ble, farine} from "../../database/gateau";

const biereId = biere._id;
const capsuleId = capsule._id;
export const newRootSpec = {};
newRootSpec.req = {
    body: {
        trunk: {
            _id: biereId
        },
        root: {
            _id: capsuleId
        }
    }
};
newRootSpec.res = {
    body: oneUpsertedResponse(biereId)
};
newRootSpec.db = {
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


export const existingIdsSpec = {};
existingIdsSpec.req = {
    body: {
        trunk: {
            _id: ble._id
        },
        root: {
            _id: farine._id
        }
    }
};
existingIdsSpec.res = {
    body: oneUpsertedResponse(ble._id)
};
existingIdsSpec.db = {
    expected: {
        colname: cols.ROOT,
        doc: {
            _id: ble._id,
            items: [
                {
                    _id: farine._id
                }
            ],

        }
    }
};


export const bleToFarineAddSpec = {};
bleToFarineAddSpec.req = {
    body: {
        trunk: {
            _id: farine._id
        },
        root: {
            _id: ble._id
        }
    }
};
bleToFarineAddSpec.res = {
    body: oneModifiedResponse
};
bleToFarineAddSpec.db = {
    expected: {
        colname: cols.ROOT,
        doc: {
            _id: farine._id,
            items: [
                {
                    "_id": ble._id,
                }
            ],

        }
    }
};
