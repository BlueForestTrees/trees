import {oneModifiedResponse} from "test-api-express-mongo/dist/domain"
import {remove} from "test-api-express-mongo/dist/util"
import {cols} from "../../../src/const/collections"
import {bleTrunk, farineItem, farineRoot, farineRoots, gateauRoots} from "../../database/gateau"

export const rootDeletionSpec = {
    req: {
        method: `DELETE`,
        path: "/api/root",
        param: `/${gateauRoots._id}/${farineItem._id}`,
    },
    res: {
        expected: oneModifiedResponse
    },
    db: {
        expected: {
            colname: cols.ROOT,
            doc: remove(gateauRoots, "items", {_id: farineItem._id})
        }
    }
}

export const deleteFarineRootBleSpec = {
    req: {
        path: "/api/root",
        param: `/${farineRoots[0]._id}`,
        method: "DELETE"
    },
    res: {
        expected: oneModifiedResponse
    },
    db: {
        expected: {
            colname: cols.ROOT,
            missingDoc: farineRoots[0]
        }
    }
}
