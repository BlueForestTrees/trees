import {cols} from "../../const/collections";
import {col} from "../../repo";
import {withId} from "../../util/query";

const roots = () => col(cols.ROOT);

export const getRoots = async _id => roots().findOne(withId(_id));