import {oneModifiedResponse} from "test-api-express-mongo"
import {cols} from "../../../src/const/collections"
import {remove} from "test-api-express-mongo"
import {bleBranch, farineBranch, farineItem} from "../../database/gateau"


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