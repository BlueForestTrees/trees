import {bleRootDeletionSpec, rootDeletionSpec} from "../root/testDeleteRootSpec";
import {branchDeletionSpec, farineBranchDeletionSpec} from "../branch/testDeleteBranchSpec";

export const linkDeletionSpec = {};

linkDeletionSpec.req = rootDeletionSpec.req;

linkDeletionSpec.res = {
    expected: [rootDeletionSpec.res.expected, branchDeletionSpec.res.expected]
};

linkDeletionSpec.db = {
    expected: {
        list: [rootDeletionSpec.db.expected, branchDeletionSpec.db.expected]
    }
};



export const bleLinkDeletionSpec = {};

bleLinkDeletionSpec.req = bleRootDeletionSpec.req;

bleLinkDeletionSpec.res = {
    expected: [bleRootDeletionSpec.res.expected, farineBranchDeletionSpec.res.expected]
};

bleLinkDeletionSpec.db = {
    expected: {
        list: [bleRootDeletionSpec.db.expected, farineBranchDeletionSpec.db.expected]
    }
};