import {cols} from "../const/collections";
import {col} from "../db/db";
import configure from "trees-items-service";

const upsertBranch = configure(() => col(cols.BRANCH)).upsertItem;
const upsertRoot = configure(() => col(cols.ROOT)).upsertItem;

const removeRoot = configure(() => col(cols.ROOT)).removeItem;
const removeBranch = configure(() => col(cols.BRANCH)).removeItem;


const insertRoot = configure(() => col(cols.ROOT)).insertItem;
const insertBranch = configure(() => col(cols.BRANCH)).insertItem;

export const insertLink = ({trunk, root}) => Promise.all([
    insertRoot(trunk, root),
    insertBranch(root, trunk)
]);

export const removeLink = ({trunkId, rootId}) => Promise.all([
    removeRoot(trunkId, rootId),
    removeBranch(rootId, trunkId)
]);

export const upsertLink = ({trunk, root}) => Promise.all([
    upsertRoot(trunk, root),
    upsertBranch(root, trunk)
]);