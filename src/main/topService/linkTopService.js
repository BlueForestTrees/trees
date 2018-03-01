import {insertRoot, removeRoot, upsertRoot} from "../service/root/rootCommands";
import {insertBranch, removeBranch, upsertBranch} from "../service/branch/branchCommands";

export const insertLink = ({trunk, root}) => Promise.all([
    insertRoot({trunk, root}),
    insertBranch({trunk: root, branch: trunk})
]);

export const removeLink = ({trunkId, rootId}) => Promise.all([
    removeRoot({trunkId, rootId}),
    removeBranch({trunkId: rootId, branchId: trunkId})
]);

export const upsertLink = ({trunk, root}) => Promise.all([
    upsertRoot({trunk, root}),
    upsertBranch({trunk: root, branch: trunk})
]);