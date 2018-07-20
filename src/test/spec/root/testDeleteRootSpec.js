import {oneModifiedResponse} from "../testCommonSpec";
import {remove} from "../../util/testUtil";
import {cols} from "../../../main/const/collections";
import {bleTrunk, farineItem, farineRoot, gateauRoot} from "../../database/gateau";

export const rootDeletionSpec = {
    req: {
        method: `DELETE`,
        path: "/api/root",
        param: `/${gateauRoot._id}/${farineItem._id}`,
    },
    res: {
        expected: oneModifiedResponse
    },
    db: {
        expected: {
            colname: cols.ROOT,
            doc: remove(gateauRoot, "items", {_id: farineItem._id})
        }
    }
};

export const deleteFarineRootBleSpec = {
    req: {
        path: "/api/root",
        param: `/${farineRoot._id}/${bleTrunk._id}`,
        method: "DELETE"
    },
    res: {
        expected: oneModifiedResponse
    },
    db: {
        expected: {
            colname: cols.ROOT,
            doc: remove(farineRoot, "items", {_id: bleTrunk._id})
        }
    }
};
