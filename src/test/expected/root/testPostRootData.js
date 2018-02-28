import {oneModifiedResponse, oneUpsertedResponse} from "../testCommonData";
import {cols} from "../../../main/const/collections";
import {biere, capsule} from "../../database/biere";
import {bleTrunk, farineTrunk} from "../../database/gateau";

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
            _id: bleTrunk._id
        },
        root: {
            _id: farineTrunk._id
        }
    }
};
existingIdsSpec.res = {
    body: oneUpsertedResponse(bleTrunk._id)
};
existingIdsSpec.db = {
    expected: {
        colname: cols.ROOT,
        doc: {
            _id: bleTrunk._id,
            items: [
                {
                    _id: farineTrunk._id
                }
            ],

        }
    }
};


export const bleToFarineAddSpec = {};
bleToFarineAddSpec.req = {
    body: {
        trunk: {
            _id: farineTrunk._id
        },
        root: {
            _id: bleTrunk._id
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
            _id: farineTrunk._id,
            items: [
                {
                    "_id": bleTrunk._id,
                }
            ],

        }
    }
};
