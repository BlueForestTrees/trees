import {objId} from "../../src/util/sanitize";
import {initialDB} from "../initial/testDB";
import {cols} from "../../src/const/collections";

export const initialTrees = objId(initialDB[cols.TREES]);