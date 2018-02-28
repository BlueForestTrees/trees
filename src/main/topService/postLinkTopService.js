import {insertRoot} from "../service/root/rootCommands";
import {insertBranch} from "../service/branch/branchCommands";

export const insertLink = ({trunk, root}) => Promise.all([() => insertRoot(trunk._id, root._id), insertBranch(trunk._id, root._id)]);