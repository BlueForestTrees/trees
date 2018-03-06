import {withId} from "../../util/query";
import {cols} from "../../const/collections";
import {col} from "../../db";

const trunks = () => col(cols.TRUNK);

export const purgeTrunks = () => trunks().deleteMany();
export const remove = id => trunks().deleteOne(withId(id));