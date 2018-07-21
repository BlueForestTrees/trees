import {withId} from "trees-query";
import {cols} from "../../const/collections";
import {col} from "../../db/db";

const trunks = () => col(cols.TRUNK);

export const remove = id => trunks().deleteOne(withId(id));