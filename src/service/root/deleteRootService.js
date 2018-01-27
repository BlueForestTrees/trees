import {pullFromRoots, withId} from "../../util/query";
import {cols} from "../../const/collections";
import {col} from "../../repo/index";

const roots = () => col(cols.ROOT);

export const removeRoot = async ({trunkId, rootId}) => roots().update(withId(trunkId), pullFromRoots(rootId));