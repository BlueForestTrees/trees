import {insertRoot} from "../service/root/rootCommands";

export const insertLink = ({trunk, root}) => Promise.all([() => insertRoot(trunk._id, root._id), insertBranch(trunk._id, root._id)]);