import {oneModifiedResponse, oneUpsertedResponse} from "../testCommonData";
import {cols} from "../../../main/const/collections";
import {biere, capsule} from "../../database/biere";
import {bleTrunk, farineTrunk} from "../../database/gateau";

export const newBranchSpec = {};
newBranchSpec.req = {
    body: {
        trunk: {
            _id: capsule._id
        },
        branch: {
            _id: biere._id
        }
    }
};
newBranchSpec.res = {
    body: oneUpsertedResponse(capsule._id)
};
newBranchSpec.db = {
    expected: {
        colname: cols.BRANCH,
        doc: {
            _id: capsule._id,
            items: [
                {
                    _id: biere._id
                }
            ],

        }
    }
};


export const existingBranchPostSpec = {};
existingBranchPostSpec.req = {
    body: {
        trunk: {
            _id: bleTrunk._id
        },
        branch: {
            _id: farineTrunk._id
        }
    }
};
existingBranchPostSpec.res = {
    body: oneModifiedResponse
};
existingBranchPostSpec.db = {
    expected: {
        colname: cols.BRANCH,
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


export const farineToBleBranchAddSpec = {};
farineToBleBranchAddSpec.req = {
    body: {
        trunk: {
            _id: bleTrunk._id
        },
        branch: {
            _id: farineTrunk._id
        }
    }
};
farineToBleBranchAddSpec.res = {
    body: oneModifiedResponse
};
farineToBleBranchAddSpec.db = {
    expected: {
        colname: cols.BRANCH,
        doc: {
            _id: bleTrunk._id,
            items: [
                {
                    "_id": farineTrunk._id,
                }
            ],

        }
    }
};
