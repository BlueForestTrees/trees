import {addRoot} from "./putRootService";

export const insertRoot = ({trunk, root}) => addRoot(trunk._id, root._id);