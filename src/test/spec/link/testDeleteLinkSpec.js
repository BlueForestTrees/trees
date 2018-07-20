import {deleteFarineRootBleSpec, rootDeletionSpec} from "../root/testDeleteRootSpec";
import {branchDeletionSpec, deleteBleBranchFarineSpec} from "../branch/testDeleteBranchSpec";

export const linkDeletionSpec = {
    req: {...rootDeletionSpec.req, path: "/api/link"},
    res: {
        expected: [rootDeletionSpec.res.expected, branchDeletionSpec.res.expected]
    },
    db: {
        expected: {
            list: [rootDeletionSpec.db.expected, branchDeletionSpec.db.expected]
        }
    }
};