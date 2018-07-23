import {oneModifiedResponse, oneUpsertedResponse} from "trees-test/dist/domain";
import {cols} from "../../../src/const/collections";
import {biere, capsule} from "../../database/biere";
import {bleTrunk, farineTrunk} from "../../database/gateau";

export const newBranchSpec = {
    req:{
        url: '/api/branch',
        method: "POST",
        body: {
            trunk: {_id: capsule._id},branch: {_id: biere._id}
        }
    },
    res:{
        body: oneUpsertedResponse(capsule._id)
    },
    db:{
        expected: {
            colname: cols.BRANCH,
            doc: {
                _id: capsule._id,
                items: [{_id: biere._id}],
            }
        }
    }
};

export const existingBranchPostSpec = {
    req:{
        url: '/api/branch',
        method: "POST",
        body: {
            trunk: {_id: bleTrunk._id},branch: {_id: farineTrunk._id}
        }
    },
    res:{
        body: oneModifiedResponse
    },
    db:{
        expected: {
            colname: cols.BRANCH,
            doc: {
                _id: bleTrunk._id,
                items: [{_id: farineTrunk._id}],

            }
        }
    }
};

export const farineToBleBranchAddSpec = {
    req: {
        path:"/api/branch",
        method:"POST",
        body: {
            trunk: {_id: bleTrunk._id}, branch: {_id: farineTrunk._id}
        }
    },
    res: {
        body: oneModifiedResponse
    },
    db: {
        expected: {
            colname: cols.BRANCH,
            doc: {
                _id: bleTrunk._id,
                items: [{"_id": farineTrunk._id,}],
            }
        }
    }
};
