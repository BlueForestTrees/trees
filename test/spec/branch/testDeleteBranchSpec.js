import {oneModifiedResponse} from "test-api-express-mongo/dist/domain"
import {cols} from "../../../src/const/collections"
import {remove} from "test-api-express-mongo/dist/util"
import {bleBranch, farineBranch, farineItem} from "../../database/gateau"

export const branchDeletionSpec = {
    req: {
        method: "DELETE",
        path: "/api/branch",
        param: `/${farineBranch._id}/${farineBranch.items[0]._id}`,
    }, res: {
        expected: oneModifiedResponse
    },
    db: {
        expected: {
            colname: cols.BRANCH,
            doc: remove(farineBranch, "items", {_id: farineBranch.items[0]._id})
        }
    }
}

export const deleteBleBranchFarineSpec = {
    req: {
        method: "DELETE",
        path: "/api/branch",
        param: `/${bleBranch._id}/${farineItem._id}`,
    },
    res: {
        expected: oneModifiedResponse
    },
    db: {
        expected: {
            colname: cols.BRANCH,
            doc: remove(bleBranch, "items", {_id: farineItem._id})
        }
    }
}