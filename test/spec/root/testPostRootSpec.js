import {oneModifiedResponse, oneUpsertedResponse} from "trees-test/dist/domain"
import {cols} from "../../../src/const/collections"
import {biere, capsule} from "../../database/biere"
import {bleTrunk, farineTrunk} from "../../database/gateau"

const biereId = biere._id
const capsuleId = capsule._id
export const newRootSpec = {
    req: {
        url: `/api/root`,
        method: "POST",
        body: {trunk: {_id: biereId}, root: {_id: capsuleId}}
    },
    res: {
        body: oneUpsertedResponse(biereId)
    },
    db: {
        expected: {
            colname: cols.ROOT,
            doc: {
                _id: biereId,
                items: [{_id: capsuleId}],
            }
        }
    }
}


export const existingRootPostSpec = {
    req: {
        url: `/api/root`,
        method: "POST",
        body: {trunk: {_id: farineTrunk._id}, root: {_id: bleTrunk._id}}
    },
    res: {
        body: oneModifiedResponse
    },
    db: {
        expected: {
            colname: cols.ROOT,
            doc: {
                _id: farineTrunk._id,
                items: [{_id: bleTrunk._id}],
            }
        }
    }
}

export const postRootFarineBle = {
    req: {
        method: "POST",
        path: `/api/root`,
        body: {trunk: {_id: farineTrunk._id}, root: {_id: bleTrunk._id}}
    },
    res: {
        body: oneModifiedResponse
    },
    db: {
        expected: {
            colname: cols.ROOT,
            doc: {
                _id: farineTrunk._id,
                items: [{_id: bleTrunk._id}],
            }
        }
    }
}
