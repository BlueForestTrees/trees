import {pullFromRoots, withId} from "../../util/query";
import {cols} from "../../const/collections";
import {col} from "../../repo";

const roots = () => col(cols.ROOT);

export const removeRoot = ({trunkId, rootId}) => roots().update(withId(trunkId), pullFromRoots(rootId));